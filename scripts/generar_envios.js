require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuración desde .env
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
};

// ID de la campaña que se usará (puede hacerse dinámico más adelante)
const CAMPANIA_ID = 1;

async function generarEnvios() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // 1. Obtener la campaña seleccionada
    const [campanias] = await connection.execute(
      'SELECT * FROM ll_campanias_whatsapp WHERE id = ?',
      [CAMPANIA_ID]
    );

    if (campanias.length === 0) {
      console.log(`❌ No se encontró la campaña con ID ${CAMPANIA_ID}`);
      return;
    }

    const campania = campanias[0];
    console.log(`✅ Campaña encontrada: ${campania.nombre}`);

    // 2. Obtener todos los lugares con teléfono
    const [lugares] = await connection.execute(`
      SELECT l.nombre, l.telefono, r.nombre AS rubro
      FROM ll_lugares l
      LEFT JOIN ll_rubros r ON l.rubro_id = r.id
      WHERE l.telefono IS NOT NULL AND l.telefono != ''
    `);

    if (lugares.length === 0) {
      console.log('⚠️ No se encontraron lugares con teléfono válido.');
      return;
    }

    let insertados = 0;

    // 3. Recorrer lugares y generar envíos personalizados
    for (const lugar of lugares) {
      const mensajePersonalizado = campania.mensaje
        .replace(/{{nombre}}/gi, lugar.nombre || '')
        .replace(/{{rubro}}/gi, lugar.rubro || '');

      await connection.execute(`
        INSERT INTO ll_envios_whatsapp
        (campania_id, telefono, nombre_destino, mensaje_final, estado)
        VALUES (?, ?, ?, ?, 'pendiente')
      `, [
        campania.id,
        lugar.telefono,
        lugar.nombre,
        mensajePersonalizado
      ]);

      insertados++;
    }

    console.log(`✅ Se generaron ${insertados} registros en ll_envios_whatsapp.`);

  } catch (error) {
    console.error('❌ Error en la generación de envíos:', error.message);
  } finally {
    await connection.end();
  }
}

generarEnvios();
