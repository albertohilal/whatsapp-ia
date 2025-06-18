#!/bin/bash

echo "🚀 Iniciando restauración del bot WhatsApp-IA..."

# 1. Instalar dependencias base
apt update && apt install -y git curl unzip software-properties-common

# 2. Instalar Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 3. Instalar pm2
npm install -g pm2

# 4. Instalar Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install -y ./google-chrome-stable_current_amd64.deb

# 5. Clonar el repositorio
git clone https://github.com/albertohilal/whatsapp-ia.git
cd whatsapp-ia

# 6. Instalar dependencias del proyecto
npm install

# 7. Crear archivo .env manualmente
echo "🔑 Recordá crear tu archivo .env con tus claves"

# 8. Levantar con PM2
pm2 start index.js --name whatsapp-ia
pm2 save
pm2 startup
