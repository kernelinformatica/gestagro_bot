module.exports = async (sock, from, text, msg) => {
    // const response = `⚠️ No entiendo tu mensaje: "${text}". Por favor, intenta con otro comando o escribe "ayuda" para ver las opciones disponibles.`;
    const response = '🤖 *👋 Hola soy el Boot de Gestagro.\n ¿Como estas?'
    await sock.sendMessage(from, { text: response });
  };