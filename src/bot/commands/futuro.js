const { m, obtenerMercadoCereales } = require('../../services/apiCliente');
const mensajes = require('../../bot/mensajes');
module.exports = async (sock, from, nroCuenta) => {
  try {
    const jid = from
    const numeroFull = jid.split('@')[0];
    const numero = numeroFull.slice(3); 
    const mercado = 'futuro'
    if (!validacion || !validacion.usuario) {
        await sock.sendMessage(from, { text: mensajes.numero_no_asociado });
        return;
      }
    const saldo = await obtenerMercadoCereales( numero, mercado);
    await sock.sendMessage(from, { text: saldo.message });
    
  } catch (error) {
   
    await sock.sendMessage(from, { text: mensajes.error_solicitud });
  }
};