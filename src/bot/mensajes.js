const mensajes = {
    gestagro : '🤖 *👋 Hola soy el Boot de Gestagro, te cuento quién soy:*\n\nSoy un sistema pensado y diseñado para el sector agropecuario, más específicamente para Cooperativas Agrícolas y Acopio de Granos.\n\nEscribi *menu* o *ayuda* para conocer los comandos que tengo disponibles.',
    numero_no_asociado : '🤖 *No se pudo verificar su número* \n\n🚫 Su celular *no esta asociado a la cooperativa con la que intenta consultar*. No se puede obtener la información requerida.\n\nComuniquese con su cooperativa asociada para habilitar su número.' ,
    menu: '🤖 Opciones dipsonibles :\n\n1️⃣ *info*: Te cuento quién soy\n2️⃣ *pesos*: Saldo de su cuenta corriente en pesos \n3️⃣️ *dolar*: Saldo de su cuenta corriente en dolares (si es que posee) \n4️⃣ *cereales*: Resumen de cereales  \n5️⃣ *fice*: Ficha de cereales (Envia: *fice + cereal + clase + cosecha*).\n6️⃣ *firo*: Ficha de romaneos pendientes (Envia: *firo + cereal + clase + cosecha*). \n7️⃣ *disponible*: Mercado de Disponible que publica la cooperativa. \n8️⃣ *futuro:* Mercado Futuro que publica la cooperativa.', 
    menu_cuenta : '🤖 Menú Cuenta:\n1. *cambiarclave* → Cambiar clave de acceso a plataforma web.\n2. *cambiarmail* → Cambiar email registrado en plataforma web. \n',
    menu_resumen_ctacte_pesos :'🤖 Si desea descargar el resumen en pesos en formato pdf, escribí "resumen" o ingresa el número "10"\n', 
    menu_resumen_ctacte_dolar :'🤖 Si desea descargar el resumen en dólares en formato pdf, escribí "resumendolar" o ingresa el número "11"\n', 
    menu_detalle_ficha_cereal :'🤖 Si desea descargar la ficha de cereal en formato pdf, escribí "fice" o ingresa el número "5"\n',
    error_solicitud : '⚠️ No se pudo procesar tu solicitud en este momento, intenta nuevamente más tarde.',
    error_comando :'⚠️ Comando no reconocido.',
    error_comando_proceso : '🛑 Error al procesar el comando solicitado:',
    error_obtencion_saldos : '⚠️ No se pudo obtener el saldo requerido en este momento, inténte nuevamente más tarde.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.', 
    error_obtencion_resumen_ctacte : '⚠️ No se pudo obtener el resumen completo de su cuenta en pesos.\nEscribi *ayuda* para conocer los comandos que tengo disponibles.', 
    error_obtencion_ficha_cereales : '⚠️ No se pudo obtener su ficha de cereal. Parámetros insuficientes o la búsqueda no arrojó ningún resultado, inténte nuevamente !!\n\nDebe enviar:  *fice + cereal  + clase + cosecha.*\n\nPor ejemplo: *fice soja 0 2425*.\n\n🤖 Escribi *menu* para volver al menú principal o 4️⃣ para volver al resumen de cereales.', 
    error_obtencion_ficha_romaneos : '⚠️ No se pudo obtener su ficha de romaneos. Parámetros insuficientes o la búsqueda no arrojó ningún resultado, inténte nuevamente !!\n\nDebe enviar: *firo + cereal  + clase + cosecha.*\n\nPor ejemplo: *firo soja 0 2425*.\n\n🤖 Escribi *menu* para volver al menú principal.', 
    error_obtener_cotizaciones : '⚠️ No se pudo obtener las cotizaciones del BNA. Inténtelo nuevamente más tarde.',
    error_general: '🛑 Ocurrió un error inesperado, por favor intente nuevamente más tarde.',
    comando_desconocido :  `🤖 No entiendo tu mensaje: Por favor, intenta con otro comando o escribi *menu* o *ayuda* para ver las opciones disponibles.`,
    
}
module.exports = mensajes;