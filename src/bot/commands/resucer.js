const { obtenerResumenDeCereales } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta) => {
  try {
    const jid = from
    const numero = jid.split('@')[0]
    const saldo = await obtenerResumenDeCereales( numero, "PES");
    await sock.sendMessage(from, { text: saldo.message });
  } catch (error) {
    console.error('Error al procesar el comando resucer:', error);
    await sock.sendMessage(from, { text: '⚠️ No se pudo obtener el *resumen de cereales* en este momento, inténte nuevamente más tarde.'+error });
  }
};