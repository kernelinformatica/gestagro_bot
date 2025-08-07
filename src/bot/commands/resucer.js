const { obtenerResumenDeCereales, verificarUsuarioValido, obtenerFichaDeCereales } = require('../../services/apiCliente');
const mensajes = require("../mensajes");
module.exports = async (sock, from, nroCuenta) => {
  console.log(":: Resumen de cereales ::");
  try {
    const jid = from;
    const numeroFull = jid.split('@')[0];
    const numero = numeroFull.slice(3); 
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    if (!validacion || !validacion.usuario) {
      await sock.sendMessage(from, { text:mensajes.numero_no_asociado });
      return;
    }

    // Obtener el resumen de cereales
    //console.log(":: Resumen de cereales ::");
    const resu = await obtenerResumenDeCereales(numero);
    console.log("Resumen obtenido:", resu); 
   
    let resumenObj;
    
    if (typeof resu.message === 'string') {
      const jsonString = resu.message.replace(/'/g, '"');
      resumenObj = JSON.parse(jsonString);
    
    } else {
      resumenObj = resu.message; // Ya era objeto
    }
    let nombreSocio = resumenObj.nombre;
    let nombreEmpresa = resumenObj.empresa;
    let cuenta = resumenObj.cuenta;
    
    sep = "\n-------------------------------------------\n"
    let mensaje = `🤖 *Resumen de cereales*\n`;
    mensaje += `${nombreSocio}\n`+sep;
    
    resumenObj.resumen.forEach(async item => {
      const claseFormateada = parseInt(item.clase_codigo, 10);
      const cosechaFormateada = item.cosecha.replace('/', ''); // Resultado: "2425"
     
      console.log(`🌾 Cer:${item.cereal} \n(${item.cosecha}): ${item.saldo.toLocaleString()} kg`);
     //mensaje += `${item.cereal} ${item.clase} (${item.cosecha}): ${item.saldo.toLocaleString()} kg\n\n\_Ficha: Escribí 'fice' '${item.cereal}' '${claseFormateada}' '${cosechaFormateada}_\n_Romaneos: Escribí 'firo' '${item.cereal}' '${claseFormateada}' '${cosechaFormateada}_'${sep}'`;
      mensaje += 
     `️️✔️ ${item.cereal}\n✔️ Clase: ${item.clase}\n✔️ Cosecha: ${item.cosecha}\n✔️ Kg: ${item.saldo.toLocaleString()}\n\n` +
     `_📄 Ficha cereales:_\nescribí: *fice* ${item.cereal} ${claseFormateada} ${cosechaFormateada}\n` +
     `_📄 Romaneos pendientes_:\nescribí: *firo* ${item.cereal} ${claseFormateada} ${cosechaFormateada}\n` +
     sep;
     
      
      
    });
    
    /*let mensaje = "";
    for (const item of resumenObj.resumen) {
      console.log(`🌾 ${item.cereal} (${item.cosecha}): ${item.saldo.toLocaleString()} kg`);
    
      const texto = `${item.cereal} (${item.cosecha}): ${item.saldo.toLocaleString()} kg`;
    
      const buttonId = `ver_ficha_${item.cereal}_${item.cosecha}`.replace(/\s+/g, '_'); // evitar espacios
    
      await sock.sendMessage(from, {
        text: texto,
        buttons: [
          {
            buttonId: buttonId,
            buttonText: { displayText: '🔍 Ver ficha' },
            type: 1
          }
        ],
        headerType: 1
      });
    }
    */
    mensaje += "(S.E.U.O.)\n";
    mensaje += nombreEmpresa;
    
    await sock.sendMessage(from, { text: mensaje });

  } catch (error) {
   
    await sock.sendMessage(from, { text: mensajes.error_solicitud + " " + error.message });
    console.error("🛑 Error completo:", error);

    
  }
};