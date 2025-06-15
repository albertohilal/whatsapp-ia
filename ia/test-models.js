require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function listarModelos() {
  const modelos = await openai.models.list();
  modelos.data.forEach((modelo) => {
    console.log(modelo.id);
  });
}

listarModelos().catch(console.error);
