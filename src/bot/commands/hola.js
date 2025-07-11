module.exports = async (sock, from, text, msg) => {
    // const response = `⚠️ No entiendo tu mensaje: "${text}". Por favor, intenta con otro comando o escribe "ayuda" para ver las opciones disponibles.`;
    const response = '🤖 *👋 Hola soy el Boot de Gestagro:*\n\nSoy un sistema pensado y diseñado para el sector agropecuario, más específicamente para Cooperativas Agrícolas y Acopio de Granos.\n\nEscribi *ayuda* para conocer los comandos que tengo disponibles.'
    await sock.sendMessage(from, { text: response });
  };