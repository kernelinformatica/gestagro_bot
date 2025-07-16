const mensajes = {
    gestagro : '🤖 *👋 Hola soy el Boot de Gestagro, te cuento quién soy:*\n\nSoy un sistema pensado y diseñado para el sector agropecuario, más específicamente para Cooperativas Agrícolas y Acopio de Granos.\n\nEscribi *menu* o *ayuda* para conocer los comandos que tengo disponibles.',
    numero_no_asociado : '🤖 *No se pudo verificar su número* \n\n🚫 Su celular *no esta asociado a la cooperativa con la que intenta consultar*. No se puede obtener la información requerida.\n\nComuniquese con su cooperativa asociada para habilitar su número.' ,
    menu: '🤖 Menú :\n1. *info* → Te cuento quién soy\n2. *pesos* → saldo de su cuenta corriente en pesos \n3. *dolar* → saldo de su cuenta corriente en dolares (si es que posee) \n4. *cereales* → Resumen de cereales  \n5. *fichacereales* → Ficha de cereales.\n6. *ficharomaneos* → Ficha de romaneos pendientes. \n7. *disponible* → Mercado de Disponible que publica la cooperativa. \n8. *futuro* → Mercado Futuro que publica la cooperativa.', 
    menu_cuenta : '🤖 Menú Cuenta:\n1. *cambiarclave* → Cambiar clave de acceso a plataforma web.\n2. *cambiarmail* → Cambiar email registrado en plataforma web. \n',
    error_solicitud : '⚠️ No se pudo procesar tu solicitud en este momento, intenta nuevamente más tarde.',
    error_comando :'⚠️ Comando no reconocido.',
    error_comando_proceso : '🛑 Error al procesar el comando solicitado:',
    error_obtencion_saldos : '🛑 No se pudo obtener el saldo requerido en este momento, inténte nuevamente más tarde.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.', 
    comando_desconocido :  `🤖 No entiendo tu mensaje: Por favor, intenta con otro comando o escribi *menu* o *ayuda* para ver las opciones disponibles.`,
}
module.exports = mensajes;