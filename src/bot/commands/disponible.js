const { m, obtenerMercadoCereales, verificarUsuarioValido } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta) => {
  try {
    const jid = from
    const numero = jid.split('@')[0]
    const mercado = 'disponible'
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: '🤖 *No se pudo verificar su número* \n\n🚫 Su celular *no esta asociado a la cooperativa con la que intenta consultar*. No se puede obtener la información solilcitada.\n\nConsulte con su cooperativa asociada para habilitar su número.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.' });
      return;
    }
    const saldo = await obtenerMercadoCereales( numero, mercado);
    await sock.sendMessage(from, { text: saldo.message });
  } catch (error) {
    console.error('Error al procesar el comando requerido:', error);
    await sock.sendMessage(from, { text: '⚠️ No se pudo obtener el la información requerida  en este momento.\n\nPor favor inténte nuevamente más tarde.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.' });
  }
};