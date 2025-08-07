const mensajes = require('../../bot/mensajes');
const { m, verificarUsuarioValido } = require('../../services/apiCliente');
module.exports = async (sock, from, text, msg) => {
  
  try {
    const jid = from
    const numeroFull = jid.split('@')[0];
    const numero = numeroFull.slice(3); 
    const mercado = 'disponible'
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: mensajes.numero_no_asociado });
      return;
    }
    const respuesta = `❓ No entendí  tu mensaje "${text}". A continuación te muestro el menú de opciones que tengo para ofrecerte:`;
    //await sock.sendMessage(from, { text: `${respuesta}\n\n${mensajes.menu}` });
    await sock.sendMessage(from, { text: `${mensajes.menu}` });
  } catch (error) {
    await sock.sendMessage(from, { text: mensajes.error_solicitud });
  }

  
};
