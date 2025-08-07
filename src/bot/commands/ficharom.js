const { obtenerFichaDeCereales, verificarUsuarioValido } = require('../../services/apiCliente');
const cerealesPorDescripcion = require('./../maps/cereales'); // ruta relativa según tu estructura
const mensajes = require('../mensajes');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports = async (sock, from, argumentos) => {
  console.log("argumentos: "+argumentos)
  try {
    const jid = from;
    const numeroFull = jid.split('@')[0];
    const numero = numeroFull.slice(3);
   
    // Verificar si el usuario es válido
    const validacion = await verificarUsuarioValido(numero);
    const usuario = validacion['usuario'];
    const [id, cta] = usuario;
    const cuenta = cta;
    const coope = id; 
    const argumentosParse = argumentos.trim().split(/\s+/);

  // Extraer cereal (puede tener más de una palabra)
  const cerealNombre = argumentosParse.slice(1, argumentosParse.length - 2).join(' ');
  const codigoCereal = buscarCodigoCereal(cerealNombre);
  const cereal = codigoCereal;

  // Extraer clase y formatearla
  const clase = argumentosParse[argumentosParse.length - 2].toString().padStart(3, '0');

  // Extraer y formatear cosecha
  const cosechaRaw = argumentosParse[argumentosParse.length - 1];
  const cosechaFormateada = cosechaRaw.length === 4
    ? cosechaRaw.slice(0, 2) + '/' + cosechaRaw.slice(2)
    : cosechaRaw; // Si ya viene con "/", lo dejamos como está
  const cosecha = cosechaFormateada;

  // Tipo fijo
  const tipo = "ficha-romaneo";

  // Validación de usuario
  if (!validacion || !validacion.usuario) {
    await sock.sendMessage(from, { text: mensajes.numero_no_asociado });
    return;
  }

  // Log de parámetros
  console.log(":: Ficha de romaneos, parametros recibidos -> " + coope + " " + cuenta + " " + cereal + " " + clase + " " + cosecha + " tipo: " + tipo);

  // Llamada a la API
  const pdfResponse = await axios.post('https://dev.kernelinformatica.com.ar/reportes/generarReportePdf', {
    coope: coope,
    cuenta: cuenta,
    cereal: cereal,
    clase: clase,
    cosecha: cosecha,
    tipo: tipo,
  }, {
    responseType: 'stream',
  });
    // Guardar temporalmente el PDF
    const tempPath = './pdfs/'+cuenta+'-ficha-romaneos-temp.pdf';
    const writer = fs.createWriteStream(tempPath);
    pdfResponse.data.pipe(writer);

    writer.on('finish', async () => {
      // Enviar el archivo como un mensaje adjunto
      const pdfBuffer = fs.readFileSync(tempPath); // Leer el archivo como buffer
      await sock.sendMessage(from, {
        document: pdfBuffer,
        mimetype: 'application/pdf',
        fileName: cuenta+'-ficha-romaneos.pdf',
      });

      await sock.sendMessage(from, { text: '✅ PDF generado y enviado con éxito.' });

      // Eliminar el archivo temporal después de enviarlo
      fs.unlinkSync(tempPath);
    });

    writer.on('error', async (error) => {
      console.error('Error al guardar el PDF:', error);
      await sock.sendMessage(from, { text: mensajes.error_obtencion_ficha_romaneos });
    });

  } catch (error) {
    console.error('Error al generar/enviar el PDF:'/*, error*/);
    await sock.sendMessage(from, { text: mensajes.error_obtencion_ficha_romaneos });
  }

  function buscarCodigoCereal(parcial) {
    const texto = parcial.toUpperCase();
  
    // 1. Buscar coincidencia exacta
    if (cerealesPorDescripcion[texto]) {
      return cerealesPorDescripcion[texto];
    }
  
    // 2. Buscar coincidencia parcial
    const clave = Object.keys(cerealesPorDescripcion)
      .find(desc => desc.includes(texto));
  
    return clave ? cerealesPorDescripcion[clave] : null;
  }
  
};

