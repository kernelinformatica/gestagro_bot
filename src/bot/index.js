const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const Boom = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const info = require('./commands/info'); // Importa el archivo ayuda.js
const ayuda = require('./commands/ayuda'); // Importa el archivo ayuda.js
const pesos = require('./commands/ccpesos'); // Importa el archivo ccpesos.js
const pesosresumen = require('./commands/ccpesosresumen');
const dolar = require('./commands/ccdolar'); // Importa el archivo ccdolar.js
const dolarresumen = require('./commands/ccdolarresumen'); // Importa el archivo ccdolarresumen.js
const resucer = require('./commands/resucer'); // Importa el archivo ccdolar.js
const disponible = require('./commands/disponible'); // Importa el archivo ccdolar.js
const futuro = require('./commands/futuro'); // Importa el archivo ccdolar.js
const porDefecto = require('./commands/default'); // Importa el archivo default.js
const { handleMessage } = require('./handlers');
const pino = require('pino');
const userStates = require('./userStates'); // Importa el módulo userStates
const fichacereal = require('./commands/fichacer');
const cotizaciones = require('./commands/dolarbna'); // Importa el archivo ccdolar.js

const ficharomaneos = require('./commands/ficharom');
const ficharom = require('./commands/ficharom');
const logger = pino({ level: 'debug' });
let sockInstance = null;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');

  const sock = makeWASocket({ auth: state });
  sockInstance = sock;

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log('🔐 Escaneá este QR para vincular:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.isBoom &&
        lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
      console.log('Conexión cerrada. ¿Reconectar? →', shouldReconnect);
      if (shouldReconnect) {
        setTimeout(() => startBot(), 3000);
      }
    }

    if (connection === 'open') {
      console.log('✅ ¡Conectado con WhatsApp!');
    }
  });

  


  
  const processedMessages = new Set(); // Set global para evitar duplicados

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    
    //console.log('📝 Nuevo mensaje recibido:', msg);
    if (!msg.message || msg.key.fromMe) return;
  
    const messageID = msg.key.id;
    if (processedMessages.has(messageID)) return; // Ya lo procesamos
    processedMessages.add(messageID); // Marcar como procesado
    
    const from = msg.key.remoteJid ?? '';
    const text =
    msg.message?.conversation ??
    msg.message?.extendedTextMessage?.text ??
    msg.message?.imageMessage?.caption ??
    msg.message?.videoMessage?.caption ??
    msg.message?.documentMessage?.caption ??
    msg.message?.buttonsResponseMessage?.selectedButtonId ??
    msg.message?.listResponseMessage?.title ?? null;
  

 
  
    //console.log(`📩 Mensaje recibido de ${from}: ${text}: ${type}`);
  
    const comandos = {
      ayuda,
      menu: ayuda,
      info,
      '1': info,
      pesos,
      'pesos': pesos,
      '2': pesos,
      pesosresumen,
      'resumen': pesosresumen,
      '10': pesosresumen,
      dolar,
      'dolar': dolar,
      '3': dolar,
      'resumendolar': dolarresumen,
      '11': dolarresumen,
      cereales: resucer,
      '4': resucer,
      fice: fichacereal,
      '5': fichacereal,
      firo: ficharomaneos,
      '6': ficharomaneos,
      disponible,
      '7': disponible,
      futuro,
      '8': futuro,
      cotizaciones,
      '9': cotizaciones,
     
    };
  
   
    const textoRaw = msg.message?.extendedTextMessage?.text;
    if (typeof textoRaw === 'string' && textoRaw.trim() !== '') {
      console.log('📝 Texto recibido:', textoRaw);
    } else {
      console.log('⚠️ No se recibió texto válido.');
      return
    }
     const comandosValidos = Object.keys(comandos);
      const partes = text.trim().split(/\s+/); // separa por espacios
     
      const comandoPrincipal = partes[0].toLowerCase(); // primer palabra
      const comandoDetectado = detectarComando(text, comandosValidos);
      const argumentos = text.trim().split(/\s+/).slice(1);

      if (comandoDetectado) {
        await comandos[comandoDetectado](sock, from, text, msg, argumentos);
      } else {
        await porDefecto(sock, from, text, msg, argumentos);
      }

  });
}

function detectarComando(texto, comandosValidos) {
  const palabras = texto.toLowerCase().split(/\s+/);
  return palabras.find(p => comandosValidos.includes(p)) ?? null;
}

module.exports = { startBot, sockInstance };