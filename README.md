Perfecto. Aquí tenés el contenido **actualizado del `README.md`** con la nueva funcionalidad `npm run dev`, que lanza simultáneamente:

* 🧠 El bot de respuestas automáticas
* 🌐 El servidor web de campañas

Incluye la tabla de contenidos, scripts, dependencias y base de datos.

---

### 📄 `README.md` actualizado (versión completa)

````markdown
# 🤖 whatsapp-ia

Sistema integral de automatización de WhatsApp:

- ✨ Respuestas automáticas inteligentes con GPT-4o
- 📢 Envío masivo personalizado por campañas
- 💬 Formularios para carga de campañas y gestión de envíos

---

## 📚 Tabla de contenidos

- [🧠 Respuesta Automática con IA](#-respuesta-automática-con-ia)
- [📢 Envío Masivo por Campañas](#-envío-masivo-por-campañas)
- [⚙️ Requisitos](#️-requisitos)
- [📦 Instalación](#-instalación)
- [🧪 Comandos útiles](#-comandos-útiles)
- [🧱 Estructura de la Base de Datos](#-estructura-de-la-base-de-datos)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [👤 Autor](#-autor)
- [📜 Licencia](#-licencia)

---

## 🧠 Respuesta automática con IA

- Utiliza `whatsapp-web.js` y `OpenAI GPT-4o`.
- Si el mensaje coincide con una respuesta predefinida (`respuestas.js`), responde directamente.
- Si no, se consulta a OpenAI para una respuesta automática.

Archivos clave:

- `bot/whatsapp.js` → inicializa el bot
- `analizador.js` → decide entre respuesta fija o IA
- `respuestas.js` → contiene respuestas rápidas
- `chatgpt.js` → conexión con OpenAI

---

## 📢 Envío masivo por campañas

- Crea campañas desde el formulario web (`form_campania.html`)
- Usa `generar_envios.js` para generar hasta 50 destinatarios
- El bot envía mensajes personalizados con `{{nombre}}` y `{{rubro}}`

---

## ⚙️ Requisitos

- Node.js v18 o superior
- MySQL
- API Key de OpenAI
- Google Chrome o Chromium

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/whatsapp-ia.git
cd whatsapp-ia
npm install
````

Archivo `.env`:

```
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=clave
DB_DATABASE=iunaorg_dyd
DB_PORT=3306

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 Comandos útiles

| Acción                            | Comando          |
| --------------------------------- | ---------------- |
| Iniciar solo el bot de WhatsApp   | `npm run bot`    |
| Iniciar solo el servidor web      | `npm run server` |
| Generar 50 envíos                 | `npm run envios` |
| Iniciar bot + servidor (modo dev) | `npm run dev`    |
| Iniciar todo desde index.js       | `npm start`      |

---

## 🧱 Estructura de la base de datos

### `ll_lugares`

```sql
CREATE TABLE ll_lugares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id VARCHAR(255),
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(50),
  email VARCHAR(100),
  sitio_web VARCHAR(255),
  latitud DOUBLE,
  longitud DOUBLE,
  rubro_id INT,
  telefono_wapp VARCHAR(20)
);
```

### `ll_rubros`

```sql
CREATE TABLE ll_rubros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  keyword_google VARCHAR(255),
  busqueda BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `ll_campanias_whatsapp`

```sql
CREATE TABLE ll_campanias_whatsapp (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  mensaje TEXT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'activa'
);
```

### `ll_envios_whatsapp`

```sql
CREATE TABLE ll_envios_whatsapp (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campania_id INT,
  telefono VARCHAR(20),
  nombre_destino VARCHAR(255),
  mensaje_final TEXT,
  estado ENUM('pendiente', 'enviado', 'fallido') DEFAULT 'pendiente',
  fecha_envio DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📁 Estructura del proyecto

```
/bot               -> Lógica de WhatsApp + IA
/scripts           -> Automatización de campañas
/routes            -> API Express para formularios
/public            -> HTML para crear campañas
.env               -> Variables de entorno
servidor.js        -> Servidor web Express
index.js           -> Entrada general del proyecto
config.js          -> Conexión a base de datos
```

---

## 👤 Autor

Desarrollado por [Alberto Hilal](https://desarrolloydisenio.com.ar)

---

## 📜 Licencia

MIT

