const fetch = require('node-fetch');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config(); // Carga las variables desde .env
const API_URL = process.env.API_BASE_URL;

const postRequest = async (endpoint, body) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
};



const obtenerCotizacionesBna = async (celu, mon, nroCuenta = "0") => {
  try {
    const url = "https://www.bna.com.ar/Cotizador/MonedasHistorico";
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // Evita bloqueos por scraping
      },
    });
    const $ = cheerio.load(html);

    let respuestaFinal = "⚠️ No se encontró la cotización del dólar.";

    $("table tbody tr").each((_, row) => {
      const cols = $(row).find("td");
      console.log("------------------ >Ver qué texto aparece: "+cols.eq(0).text().trim()); // 👀 Ver qué texto aparece
      if (cols.length >= 3) {
        const moneda = cols.eq(0).text().trim();
        const compra = parseFloat(cols.eq(1).text().trim().replace(",", "."));
        const venta  = parseFloat(cols.eq(2).text().trim().replace(",", "."));

        if (moneda === "Dolar U.S.A") {
          const spread = venta - compra;
          const emoji = spread > 10 ? "📈" : "⚖️";
          respuestaFinal = `${emoji} Dólar BNA:\n💰 Compra: $${compra.toFixed(2)}\n💸 Venta: $${venta.toFixed(2)}\n📊 Spread: $${spread.toFixed(2)}`;
        }
      }
     
    });

    return { celular: celu, moneda: mon, cuenta: nroCuenta, mensaje: respuestaFinal };


  } catch (error) {
    console.error("Error al obtener cotización BNA:", error.message);
    return await {
      celular: celu,
      moneda: mon,
      cuenta: nroCuenta,
      mensaje: "❌ No se pudo acceder a la cotización del BNA. Intentá más tarde.",
    };
  }
};


const obtenerSaldo = async (celu, mon, nroCuenta ="0") => {
  const res = await fetch(`${API_URL}/api/chat/saldo`, {
 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, moneda : mon, cuenta : nroCuenta }),
  });
 
  return await res.json();
};

const obtenerEmpresa= async (celu, codigo=0) => {
  const res = await fetch(`${API_URL}/api/chat/get-empresa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, coope:codigo }),
  });
  return await res.json();
};

const obtenerEmpresasAsociadas= async (celu, codigo=0) => {
  const res = await fetch(`${API_URL}/api/chat/get-empresas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, coope:0 }),
  });
  return await res.json();
};


const obtenerResumenDeCereales= async (celu) => {
  const res = await fetch(`${API_URL}/api/chat/resumen-cereales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu }),
  });
  return await res.json();
};

const obtenerFichaDeCereales= async (celu,  cereal, cosecha, clase = "0") => {
  const res = await fetch(`${API_URL}/api/chat/ficha-cereales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu ,  cereal:cereal, clase:clase, cosecha:cosecha }),
  });
  console.log("Respuesta de obtenerFichaDeCereales:", res.status, await res.text()); // Para depurar
  return await res.json();
};


const obtenerMercadoCereales= async (celu, tipo) => {
  const res = await fetch(`${API_URL}/api/chat/mercado-cereales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu , tipo:tipo}),
  });
  return await res.json();
};

const verificarUsuarioValido = async (celu) => {
  const res = await fetch(`${API_URL}/api/chat/verificar-usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu}),
  });
  return await res.json();
};

/*

const obtenerSaldo = (celu, mon, nroCuenta = "0") =>
  postRequest('/api/chat/saldo', { celular: celu, moneda: mon, cuenta: nroCuenta });

const obtenerEmpresa = (celu, codigo = 0) =>
  postRequest('/api/chat/get-empresa', { celular: celu, coope: codigo });

const obtenerEmpresasAsociadas = (celu) =>
  postRequest('/api/chat/get-empresas', { celular: celu, coope: 0 });

const obtenerResumenDeCereales = (celu) =>
  postRequest('/api/chat/resumen-cereales', { celular: celu });

const obtenerMercadoCereales = (celu, tipo) =>
  postRequest('/api/chat/mercado-cereales', { celular: celu, tipo: tipo });

const verificarUsuarioValido = (celu) =>
  postRequest('/api/chat/verificar-usuario', { celular: celu });

module.exports = {
  obtenerSaldo,
  obtenerEmpresa,
  obtenerEmpresasAsociadas,
  obtenerResumenDeCereales,
  obtenerMercadoCereales,
  verificarUsuarioValido,
};


*/


module.exports = { 
  obtenerSaldo, 
  obtenerEmpresa, 
  obtenerEmpresasAsociadas, 
  obtenerResumenDeCereales, 
  obtenerFichaDeCereales, 
  obtenerMercadoCereales, 
  verificarUsuarioValido,
  obtenerCotizacionesBna };