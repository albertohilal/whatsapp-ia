const { create, Client } = require('venom-bot');
const { generarRespuesta } = require('../ia/chatgpt');

function iniciarBot() {
  create({
    session: 'whatsapp-ia',
    multidevice: true,
    headless: false,
    devtools: false,
    useChrome: true,
    browserPathExecutable: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  })
    .then((client) => start(client))
    .catch((err) => console.error("❌ Error al iniciar el bot:", err));
}

function start(client) {
  console.log("✅ Bot conectado a WhatsApp. Esperando mensajes...");

  client.onMessage(async (message) => {
    if (!message.isGroupMsg && message.body) {
      console.log("📩 Mensaje recibido:", message.body);

      try {
        const respuesta = await generarRespuesta(message.body);
        await client.sendText(message.from, respuesta);
        console.log("✉️ Respuesta enviada.");
      } catch (err) {
        console.error("❌ Error al generar o enviar respuesta:", err);
      }
    }
  });
}

module.exports = { iniciarBot };
