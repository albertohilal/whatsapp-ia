const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Esta función recibe un array de mensajes en formato:
 * [
 *   { role: 'system', content: ... },
 *   { role: 'user', content: ... },
 *   { role: 'assistant', content: ... },
 *   ...
 * ]
 * y devuelve la respuesta generada por el modelo.
 */
async function generarRespuesta(mensajes) {
  try {
    console.log("🧠 Enviando a OpenAI...", mensajes);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: mensajes
    });

    console.log("✅ Respuesta recibida de OpenAI.");
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error al generar respuesta:", error);
    return "Hubo un problema al procesar tu mensaje. Por favor, intentá nuevamente más tarde.";
  }
}

module.exports = { generarRespuesta };
