# Sistema de Control Fotográfico y Documental en Tiempo Real
### Subestación Pozuzo 500 kV | Integración Notion API REST + Vercel / Cloudflare Pages

Aplicación web ejecutiva para visualización, filtrado y descarga en tiempo real del registro fotográfico e informes de obra conectados dinámicamente con la base de datos de Notion.

---

## 🚀 Despliegue en la Web (100% Gratuito)

Esta arquitectura utiliza una **Función Serverless (`/api/notion`)** que consulta de forma segura la API de Notion. Esto permite que el botón **«Actualizar en Tiempo Real»** funcione en vivo para cualquier usuario en la web o celular sin exponer jamás el token de acceso en el código frontend ni en GitHub.

### Opción A: Despliegue en Vercel (Recomendado - 2 minutos)

1. Sube este repositorio a tu cuenta de **GitHub**.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** > **"Project"** y selecciona este repositorio.
4. En la sección **"Environment Variables"**, agrega las siguientes dos variables:
   - `NOTION_API_KEY` = `ntn_X97542535676iHXQYgrXowLiK88NK5HhqnSCWvqDmfq7M2`
   - `NOTION_DATABASE_ID` = `5f0da213a2b74056b9388ced7474496a`
5. Haz clic en **"Deploy"**.
6. ¡Listo! Vercel te entregará una URL pública y segura (ejemplo: `https://registro-pozuzo.vercel.app`) accesible desde cualquier lugar.

---

### Opción B: Despliegue en Cloudflare Pages

1. Entra al panel de [Cloudflare Pages](https://dash.cloudflare.com/).
2. Conecta tu repositorio de GitHub.
3. Configura las variables de entorno en **Settings > Environment variables**:
   - `NOTION_API_KEY` = `ntn_X97542535676iHXQYgrXowLiK88NK5HhqnSCWvqDmfq7M2`
   - `NOTION_DATABASE_ID` = `5f0da213a2b74056b9388ced7474496a`
4. Haz clic en **Save and Deploy**.

---

## 💻 Ejecución Local

Para probar o usar el dashboard en tu computadora:

1. Haz doble clic en **`iniciar_servidor_tiempo_real.bat`**.
2. Se abrirá automáticamente tu navegador en `http://localhost:8085/`.
3. El botón **«Actualizar en Tiempo Real»** se conectará a través del proxy local en caliente.

---

## 🛠️ Estructura del Proyecto

```text
├── index.html                   # Dashboard web con pre-carga de 18 registros y controles
├── api/
│   └── notion.js                # Serverless function para Vercel (/api/notion)
├── functions/
│   └── api/
│       └── notion.js            # Serverless function para Cloudflare Pages
├── local_server.py              # Servidor local en Python con proxy /api/notion
├── iniciar_servidor_tiempo_real.bat # Lanzador de 1 clic para uso en local
├── vercel.json                  # Configuración de enrutamiento Vercel
├── package.json                 # Metadatos del proyecto
└── .env.example                 # Plantilla de variables de entorno
```
