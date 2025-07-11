  module.exports = async (sock, from, text, msg) => {
    // const response = `⚠️ No entiendo tu mensaje: "${text}". Por favor, intenta con otro comando o escribe "ayuda" para ver las opciones disponibles.`;
    const response = '🤖 Menú (comandos):\n1. *info* → Te cuento quién soy\n2. *ccpesos* → saldo de su cuenta corriente en pesos \n3. *ccdolar* → saldo de su cuenta corriente en dolares (si es que posee) \n4. *resucer* → Resumen de cereales  \n5. *fichacer* → Ficha de cereales.\n6. *ficharom* → Ficha de romaneos pendientes. \n7. *mercado* → Mercado de cereales de la cooperativa. ' 
    await sock.sendMessage(from, { text: response });
  };