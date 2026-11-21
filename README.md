# Tecuidamos — Sitio Web Corporativo

Sitio web corporativo y de presentación de servicios de seguridad privada y custodia especializada (**Tecuidamos / Gorat Protect**).

Desarrollado como una aplicación web estática optimizada y accesible, preparada para servirse en entornos Apache o cualquier servidor web estático.

---

## 🚀 Arquitectura y Estructura del Proyecto

El código fuente distribuible se encuentra encapsulado en la carpeta `web/`:

```text
tecuidamos/
├── .gitignore             # Reglas de exclusión para control de versiones
├── README.md              # Documentación del proyecto
├── imagenes/              # Activos visuales originales / catálogo de recursos
└── web/                   # Directorio raíz del sitio (DocumentRoot para producción)
    ├── css/
    │   └── style.css      # Estilos globales y responsive design
    ├── js/
    │   └── main.js        # Interactividad, menú móvil y validaciones
    ├── imagenes/          # Activos multimedia cargados por las páginas del sitio
    ├── index.html         # Página de inicio
    ├── nosotros.html      # Información corporativa y equipo
    ├── servicios.html     # Catálogo de servicios de seguridad y vigilancia
    ├── contacto.html      # Formulario y canales de contacto
    └── .htaccess          # Configuración Apache (compresión, seguridad, headers)
```

---

## 💻 Previsualización en Local

No se requiere ningún gestor de paquetes ni instalación de dependencias pesadas.

### Opción 1: VS Code Live Server
1. Abre la carpeta del repositorio en VS Code.
2. Abre cualquiera de los archivos HTML dentro de `web/` (por ejemplo `web/index.html`).
3. Haz clic derecho y selecciona **"Open with Live Server"**.

### Opción 2: Python HTTP Server
Desde una terminal en la raíz del proyecto:

```bash
# Servir directamente la carpeta web/
python -m http.server 8000 --directory web
```
Luego navega a `http://localhost:8000`.

### Opción 3: Servidor PHP Integrado
```bash
php -S localhost:8000 -t web
```

---

## 🌐 Despliegue en Servidor de Producción (Apache / Hosting Estático)

Para desplegar el sitio en producción:

1. **DocumentRoot:** Apunta la raíz del dominio o subdirectorio a la carpeta `web/` (o copia el contenido interior de `web/` al `public_html` del hosting).
2. **Soporte `.htaccess`:** Si utilizas Apache, asegúrate de tener `mod_rewrite`, `mod_deflate` y `mod_headers` activos para aprovechar las directivas de seguridad y compresión incluidas en `web/.htaccess`.
3. **HTTPS Obligatorio:** Se recomienda configurar certificados TLS/SSL (ej. Let's Encrypt o Cloudflare) para el tráfico web.

---

## 🔒 Buenas Prácticas DevSecOps

- **Cero secretos en el repositorio:** Toda credencial de acceso (FTP, SFTP, API keys, tokens de despliegue) debe mantenerse fuera del control de versiones.
- Archivos `.winscp`, `.vscode/sftp.json`, `.env*` y logs operativos están ignorados por el archivo `.gitignore`.
- Las actualizaciones automáticas hacia producción deben realizarse mediante mecanismos seguros como SSH/SFTP o pipelines CI/CD utilizando GitHub Secrets.
