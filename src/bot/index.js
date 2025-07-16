const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const Boom = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const info = require('./commands/info'); // Importa el archivo ayuda.js
const ayuda = require('./commands/ayuda'); // Importa el archivo ayuda.js
const pesos = require('./commands/ccpesos'); // Importa el archivo ccpesos.js
const dolar = require('./commands/ccdolar'); // Importa el archivo ccdolar.js
const resucer = require('./commands/resucer'); // Importa el archivo ccdolar.js
const disponible = require('./commands/disponible'); // Importa el archivo ccdolar.js
const futuro = require('./commands/futuro'); // Importa el archivo ccdolar.js
const { handleMessage } = require('./handlers');
const pino = require('pino');
const userStates = require('./userStates'); // Importa el módulo userStates
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

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid ?? '';
    const text =
      msg.message?.conversation || // Mensaje de texto simple
      msg.message?.extendedTextMessage?.text || // Mensaje extendido
      msg.message?.imageMessage?.caption || // Mensaje con imagen
      msg.message?.videoMessage?.caption || // Mensaje con video
      msg.message?.documentMessage?.caption || // Mensaje con documento
      msg.message?.buttonsResponseMessage?.selectedButtonId || // Respuesta a botones
      msg.message?.listResponseMessage?.title || // Respuesta a lista
      '';
  
    console.log(`📩 Mensaje recibido de ${from}: ${text}: ${type}`);
    //const userState = userStates.getState(from);
   
    // Manejo de comandos específicos
    if (text.toLowerCase() === 'ayuda' || text.toLowerCase() === 'menu' ) {
      await ayuda(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    if (text.toLowerCase() === 'info' ||  text.toLowerCase() === '1') {
      await info(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    if (text.toLowerCase() === 'pesos' || text.toLowerCase() === 'saldo pesos' || text.toLowerCase() === '2') {
      await pesos(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    if (text.toLowerCase() === 'dolar' || text.toLowerCase() === 'saldo dolar' || text.toLowerCase() === '3') {
      await dolar(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    if (text.toLowerCase() === 'cereales' || text.toLowerCase() === '4') {
      await resucer(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    /*if (text.toLowerCase() === 'ficha cereales' || text.toLowerCase() === '5') {
      await fichacer(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    if (text.toLowerCase() === 'ficha romaneos' || text.toLowerCase() === '6') {
      await ficharom(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }*/
    if (text.toLowerCase() === 'disponible' || text.toLowerCase() === '7') {
       await resucer(sock, from, text, msg); // Reutiliza el archivo ayuda.js
       return;
    }
    if (text.toLowerCase() === 'futuro' || text.toLowerCase() === '8') {
      await resucer(sock, from, text, msg); // Reutiliza el archivo ayuda.js
      return;
    }
    await handleMessage(sock, msg, from, text);
  });
}

module.exports = { startBot, sockInstance };