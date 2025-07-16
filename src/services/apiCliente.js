const fetch = require('node-fetch');
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


module.exports = { obtenerSaldo, obtenerEmpresa, obtenerEmpresasAsociadas, obtenerResumenDeCereales, obtenerMercadoCereales, verificarUsuarioValido };