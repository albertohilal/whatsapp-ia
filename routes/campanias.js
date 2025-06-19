const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
};

router.post('/', async (req, res) => {
  const { nombre, mensaje, estado } = req.body;

  if (!nombre || !mensaje || !estado) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(`
      INSERT INTO ll_campanias_whatsapp (nombre, mensaje, estado, fecha_creacion)
      VALUES (?, ?, ?, NOW())
    `, [nombre, mensaje, estado]);

    await conn.end();
    res.json({ message: '✅ Campaña guardada correctamente.' });

  } catch (err) {
    console.error('❌ Error al guardar campaña:', err.message);
    res.status(500).json({ message: 'Error al guardar campaña.' });
  }
});

module.exports = router;
