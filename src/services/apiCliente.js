const fetch = require('node-fetch');

const obtenerSaldo = async (celu, mon, nroCuenta ="0") => {
  const res = await fetch('http://10.0.0.204:5070/api/chat/saldo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, moneda : mon, cuenta : nroCuenta }),
  });
  return await res.json();
};

const obtenerEmpresa= async (celu, codigo=0) => {
  const res = await fetch('http://10.0.0.204:5070/api/chat/get-empresa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, coope:codigo }),
  });
  return await res.json();
};

const obtenerEmpresasAsociadas= async (celu, codigo=0) => {
  const res = await fetch('http://10.0.0.204:5070/api/chat/get-empresas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu, coope:0 }),
  });
  return await res.json();
};


const obtenerResumenDeCereales= async (celu) => {
  const res = await fetch('http://10.0.0.204:5070/api/chat/resumen-cereales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu }),
  });
  return await res.json();
};
const obtenerMercadoCereales= async (celu, tipo) => {
  const res = await fetch('http://10.0.0.204:5070/api/chat/mercado-cereales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ celular:celu , tipo:tipo}),
  });
  return await res.json();
};


module.exports = { obtenerSaldo, obtenerEmpresa, obtenerEmpresasAsociadas, obtenerResumenDeCereales, obtenerMercadoCereales };