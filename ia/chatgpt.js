const OpenAI = require('openai');
const contextoSitio = require('./contextoSitio');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generarRespuesta(mensajeUsuario) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: contextoSitio },
      { role: 'user', content: mensajeUsuario }
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { generarRespuesta };
