const { obtenerResumenDeCereales, verificarUsuarioValido } = require('../../services/apiCliente');
module.exports = async (sock, from, nroCuenta) => {
  try {
    const jid = from;
    const numero = jid.split('@')[0];

    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text: '🤖 *No se pudo verificar su número* \n\n🚫 Su celular *no esta asociado a la cooperativa con la que intenta consultar*. No se puede obtener el resumen de cereales.\n\nConsulte con su cooperativa asociada para habilitar su número.\n\nEscriba *ayuda* para conocer los comandos disponibles.' });
      return;
    }

    // Obtener el resumen de cereales
    const saldo = await obtenerResumenDeCereales(numero, "PES");
    await sock.sendMessage(from, { text: saldo.message });

  } catch (error) {
    console.error('Error al procesar el comando resucer:', error);
    await sock.sendMessage(from, {
      text: '⚠️ No se pudo obtener el la información requerida en este momento, intente nuevamente más tarde.\n\nEscriba *ayuda* para conocer los comandos disponibles.'
    });
  }
};