const userStates = require('../userStates');
const { obtenerSaldo, verificarUsuarioValido } = require('../../services/apiCliente');
const mensajes = require('../../bot/mensajes');
module.exports = async (sock, from, nroCuenta = "0") => {
  try {
    const jid = from;
    const numero = jid.split('@')[0];
    const cuenta = "0"
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: messajes.numero_no_asociado });
      return;
    }
    
    // Obtener el saldo en dólares
    const resp = await obtenerSaldo(numero, "USD", cuenta);
    await sock.sendMessage(from, { text: resp.message });
    console.log(`📩 Respuesta enviada al usuario ${from}: ${resp.message}`);
    

   
  } catch (error) {
    await sock.sendMessage(from, { text: '⚠️ No se pudo procesar tu solicitud en este momento, intenta nuevamente más tarde.' });
  }
};