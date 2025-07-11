const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const Boom = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
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
    // Verifica si el usuario está en estado de selección
    const userState = userStates.getState(from);
    /*if (userState?.estado === 'esperando_codigo') {
      const seleccion = parseInt(text, 10);
      const codigos = userState.codigoEmpresa;
      console.log(userState.estado)
      // Valida si el código ingresado es válido
      if (Array.isArray(codigos) && codigos.includes(text)) {
        console.log(`✅ Código válido recibido: ${text}`);
      
        // Guarda el código en el estado del usuario
        userStates.setCompanyCode(from, text);
        await sock.sendMessage(from, { text: `✅ Código ${text} registrado correctamente. Este código será válido por 1 hora.` });
      
       
     
        userStates.setState(from, { estado: 'codigo_seteado', codigoEmpresa: text });
        setTimeout(() => {
          userStates.clearState(from);
          console.log(`⏳ Estado eliminado para el usuario: ${from}`);
        }, 3600000); // 1 hora en milisegundos
        
      } else {
        if(userState.estado != 'esperando_codigo') {
          console.log('⚠️ Código inválido.');
          await sock.sendMessage(from, { text: '⚠️ Código inválido. Por favor, intenta nuevamente.' });
        }
       
      }
      
     
    }*/
    await handleMessage(sock, msg, from, text);
  });
}

module.exports = { startBot, sockInstance };