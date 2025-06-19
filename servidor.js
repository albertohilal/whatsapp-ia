// servidor.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/campanias', require('./routes/campanias'));

// Inicio del servidor
app.listen(port, () => {
  console.log(`✅ Servidor web activo en http://localhost:${port}`);
});
