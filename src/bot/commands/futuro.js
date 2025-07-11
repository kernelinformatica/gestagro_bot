const { m, obtenerMercadoCereales } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta) => {
  try {
    const jid = from
    const numero = jid.split('@')[0]
    const mercado = 'futuro'
    const saldo = await obtenerMercadoCereales( numero, mercado);
    await sock.sendMessage(from, { text: saldo.message });
  } catch (error) {
    console.error('Error al procesar el comando mercados:', error);
    await sock.sendMessage(from, { text: '⚠️ No se pudo obtener el mercado solicitado en este momento.\n\nPor favor inténte nuevamente más tarde.' });
  }
};