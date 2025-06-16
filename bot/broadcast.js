const { create } = require('venom-bot');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

async function obtenerProspectos() {
  const [rows] = await pool.query("SELECT * FROM prospectos_whatsapp WHERE enviado = 0");
  return rows;
}

async function marcarComoEnviado(id) {
  await pool.query("UPDATE prospectos_whatsapp SET enviado = 1 WHERE id = ?", [id]);
}

create({ session: 'whatsapp-broadcast' }).then(client => {
  enviarMensajes(client);
});

async function enviarMensajes(client) {
  const prospectos = await obtenerProspectos();
  for (const p of prospectos) {
    try {
      const mensaje = p.mensaje || `Hola ${p.nombre || ''}, te escribe Desarrollo y Diseño. Visitá nuestro sitio: https://desarrolloydisenio.com.ar/`;
      await client.sendText(p.telefono, mensaje);
      await marcarComoEnviado(p.id);
      console.log(`✅ Mensaje enviado a ${p.telefono}`);
    } catch (err) {
      console.error(`❌ Error al enviar a ${p.telefono}`, err.message);
    }
  }
}
