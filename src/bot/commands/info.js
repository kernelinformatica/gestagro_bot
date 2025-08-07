const mensajes = require("../mensajes");

  module.exports = async (sock, from, text, msg) => {
    const response = mensajes.gestagro;
    await sock.sendMessage(from, { text: response });
  };