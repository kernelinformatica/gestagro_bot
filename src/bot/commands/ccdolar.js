const userStates = require('../userStates');
const { obtenerSaldo, obtenerEmpresa, obtenerEmpresasAsociadas } = require('../../services/apiCliente');

module.exports = async (sock, from, nroCuenta = "0") => {
  try {
    const jid = from;
    const numero = jid.split('@')[0];
    const cuenta = "0"
    // Llama a la API para obtener el saldo inicial

    /*const empre = await obtenerEmpresasAsociadas(numero, 0);
    if (!empre) {
      await sock.sendMessage(from, { text: '⚠️ No se encontró la empresa asociada a tu número.'+String(empre[0]) });
      return;
    }
    
    if (empre.length > 1) {
      const opciones = empre.map(e => `*${e[0]}*: ${e[3]}`).join('\n');
      await sock.sendMessage(from, { text: `🤖 Hay más de una empresa asociada a tu número. Por favor, selecciona una Cooperativa:\n\n${opciones}\n\nSeleccione una opción` });
      const codigos = empre.map(e => e[0]); 
      userStates.setState(from, { estado: 'esperando_codigo', opciones: empre });
      userStates.setCompanyCode(from, codigos);
      const codigoEmpresa = empre.empresa.codigo;
      const resp = await obtenerSaldo(numero, "USD", nroCuenta, codigoEmpresa);

      await sock.sendMessage(from, { text: resp.message });
      console.log(`📩 Respuesta enviada al usuario ${from}: ${resp.message}`);
      setTimeout(() => {
        userStates.clearState(from);
        console.log(`⏳ Estado eliminado para el usuario: ${from}`);
      }, 3600000); // 1 hora en milisegundos
      //userStates.setState(from, { estado: 'esperando_codigo', codigos: "11" });
      return;
    }else{
     
      const codigoEmpresa = empre.empresa.codigo;
      const resp = await obtenerSaldo(numero, "USD", nroCuenta, codigoEmpresa);
      await sock.sendMessage(from, { text: resp.message });
      console.log(`📩 Respuesta enviada al usuario ${from}: ${resp.message}`);

    const codigoEmpresa = empre.empresa.codigo;
    }*/

     
      const resp = await obtenerSaldo(numero, "USD", cuenta);
      await sock.sendMessage(from, { text: resp.message });
      console.log(`📩 Respuesta enviada al usuario ${from}: ${resp.message}`);
    

   
  } catch (error) {
    console.error('Error al procesar el comando ccdolar:', error);
    await sock.sendMessage(from, { text: '⚠️ No se pudo procesar tu solicitud en este momento, intenta nuevamente más tarde.' });
  }
};