const { obtenerCotizacionesBna, verificarUsuarioValido } = require('../../services/apiCliente');
const mensajes = require('../../bot/mensajes');

module.exports = async (sock, from, nroCuenta = "0") => {
  try {
    const jid = from;
    const numeroFull = jid.split('@')[0]; // Extraemos el número sin @s.whatsapp.net

    const cotizaciones = await obtenerCotizacionesBna(numeroFull, "DOL", nroCuenta);
    console.log("Cotizaciones obtenidas:", cotizaciones);
    const mensaje = cotizaciones?.mensaje || "❌ No se pudo obtener la cotización.";

    await sock.sendMessage(from, { text: mensaje }, { quoted: null }); // Podés ajustar quoted si querés responder a algo

  } catch (error) {
    console.error("Error al enviar cotización BNA:", error.message);

    await sock.sendMessage(from, {
      text: "❌ No se pudo acceder a la cotización del BNA. Intentá más tarde.",
    });
  }
};
