const { create, Client } = require('venom-bot');
const { generarRespuesta } = require('../ia/chatgpt');
const { guardarMensaje, obtenerHistorial } = require('../db/conversaciones');
const contextoSitio = require('../ia/contextoSitio');

function iniciarBot() {
  create({
    session: 'whatsapp-ia',
    multidevice: true,
    headless: false,
    args: ['--no-sandbox'],
    browserPathExecutable: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  })
    .then((client) => start(client))
    .catch((err) => console.error('❌ Error al iniciar el bot:', err));
}

function start(client) {
  console.log('✅ Bot conectado a WhatsApp. Esperando mensajes...');

  client.onMessage(async (message) => {
    const telefono = message.from;

    try {
      const historial = await obtenerHistorial(telefono, 6);
      const mensajes = [
        { role: 'system', content: contextoSitio },
        ...historial.map((msg) => ({ role: msg.rol, content: msg.mensaje })),
        { role: 'user', content: message.body }
      ];

      const respuesta = await generarRespuesta(mensajes);

      await guardarMensaje(telefono, 'user', message.body);
      await guardarMensaje(telefono, 'assistant', respuesta);

      await client.sendText(telefono, respuesta);
      console.log('✅ Respuesta enviada.');
    } catch (err) {
      console.error('❌ Error al generar o enviar respuesta:', err);
    }
  });
}

module.exports = { iniciarBot };
