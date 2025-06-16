const pool = require('./connection');

/**
 * Guarda un mensaje de usuario o de IA en la tabla ll_ia_conversaciones.
 * @param {string} telefono - Número del remitente (formato WhatsApp)
 * @param {'user' | 'assistant'} rol - Rol del emisor
 * @param {string} mensaje - Contenido del mensaje
 */
async function guardarMensaje(telefono, rol, mensaje) {
  await pool.execute(
    'INSERT INTO ll_ia_conversaciones (telefono, rol, mensaje) VALUES (?, ?, ?)',
    [telefono, rol, mensaje]
  );
}

/**
 * Obtiene el historial de mensajes recientes para un número dado.
 * @param {string} telefono - Número de teléfono
 * @param {number} limite - Cantidad de mensajes (pares user+bot) a recuperar
 * @returns {Array} Lista de mensajes ordenados cronológicamente
 */
async function obtenerHistorial(telefono, limite = 6) {
  const [rows] = await pool.execute(
    'SELECT rol, mensaje FROM ll_ia_conversaciones WHERE telefono = ? ORDER BY created_at DESC LIMIT ?',
    [telefono, limite]
  );
  return rows.reverse(); // De más antiguo a más nuevo
}

module.exports = {
  guardarMensaje,
  obtenerHistorial
};
