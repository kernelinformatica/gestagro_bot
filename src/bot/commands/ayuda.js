const mensajes = require('../../bot/mensajes');
const { verificarUsuarioValido } = require('../../services/apiCliente');
module.exports = async (sock, from, text, msg) => {
   const jid = from;
   const numero = jid.split('@')[0];
   const cuenta = "0"
  // Verificar si el usuario es válido
  try {
    const validacion = await verificarUsuarioValido(numero);
    console.log(`:: Validación del usuario ${from}:`, validacion.usuario);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: mensajes.numero_no_asociado });
      return;
    }
    const response = mensajes.menu
    await sock.sendMessage(from, { text: response });

  } catch (error) {
  
    await sock.sendMessage(from, {
      text: mensajes.error_solicitud
    });
  }
}