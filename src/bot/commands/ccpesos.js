const { obtenerSaldo, verificarUsuarioValido } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta= "0") => {
  try {
    const jid = from
    const numero = jid.split('@')[0]
    const cuenta = "0"
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
   
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: '🤖 *No se pudo verificar su número* \n\n🚫 Su celular *no esta asociado a la cooperativa con la que intenta consultar*. No se puede obtener la información solicitada.\n\nConsulte con su cooperativa asociada para habilitar su número.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.' });
      return;
    }
    const saldo = await obtenerSaldo( numero, "PES", cuenta);
    console.log(saldo);
    await sock.sendMessage(from, { text: saldo.message });
  } catch {
    await sock.sendMessage(from, { text: '⚠️ No se pudo obtener el saldo en este momento, inténte nuevamente más tarde.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.' });
  }
};