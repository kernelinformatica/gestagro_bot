const { obtenerSaldo } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta= "0") => {
  try {
    const jid = from
    const numero = jid.split('@')[0]
    const cuenta = "0"
    const saldo = await obtenerSaldo( numero, "PES", cuenta);
    await sock.sendMessage(from, { text: saldo.message });
  } catch {
    await sock.sendMessage(from, { text: '⚠️ No se pudo obtener el saldo en pesos en este momento, inténte nuevamente más tarde.' });
  }
};