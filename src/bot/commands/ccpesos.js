const { obtenerSaldo, verificarUsuarioValido } = require('../../services/apiCliente');
const mensajes = require('../../bot/mensajes');
module.exports = async (sock, from, nroCuenta= "0") => {
  try {
    const jid = from
    const numeroFull = jid.split('@')[0];
    const numero = numeroFull.slice(3); 
    const cuenta = "0"
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
   
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: mensajes.numero_no_asociado });
      return;
    }
    const saldo = await obtenerSaldo( numero, "PES", cuenta);
    console.log(saldo);
    await sock.sendMessage(from, { text: saldo.message });
  } catch {
    await sock.sendMessage(from, { text: mensajes.error_obtencion_saldos });
  }
};