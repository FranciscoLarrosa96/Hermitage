<div align="center">
  <h1>🏔️ Hermitage Boutique Hotel</h1>
  <p><strong>Landing Page Institucional</strong></p>
  <p>Una experiencia web premium para un hotel boutique en las sierras de Tandil, Argentina</p>
</div>

---

## 📋 Descripción del Proyecto

**Hermitage** es una landing page empresarial desarrollada para un hotel boutique de alta gama ubicado en Tandil, Argentina. El proyecto combina diseño moderno, accesibilidad y rendimiento óptimo para ofrecer una experiencia de navegación excepcional que refleja la calidad y elegancia del establecimiento.

### 🎯 Características Principales

- ✨ **Diseño Premium**: Interfaz elegante y minimalista con animaciones fluidas
- 🎨 **Identidad Visual Corporativa**: Paleta de colores personalizada (#8D2228, #CCDADA)
- 📱 **Responsive Design**: Experiencia óptima en todos los dispositivos
- ♿ **Accesibilidad WCAG AA**: Cumplimiento de estándares de accesibilidad web
- ⚡ **Alto Rendimiento**: Optimizado para carga rápida y SEO
- 🌙 **Modo Oscuro**: Soporte para preferencias de tema del usuario

---

## 🛠️ Tecnologías Utilizadas

### Framework y Core

- **[Angular 21.0](https://angular.dev/)** - Framework principal
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Lenguaje de programación
- **[RxJS 7.8](https://rxjs.dev/)** - Programación reactiva

### Estilos y UI

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework de utilidades CSS
- **[AOS 2.3](https://michalsnik.github.io/aos/)** - Animaciones al hacer scroll
- **SCSS** - Preprocesador CSS para estilos personalizados

### Herramientas de Desarrollo

- **[Angular CLI 21.0.5](https://angular.dev/cli)** - Herramienta de línea de comandos
- **[Vitest 4.0](https://vitest.dev/)** - Framework de testing
- **[Prettier](https://prettier.io/)** - Formateador de código
- **npm 11.1** - Gestor de paquetes

### Arquitectura

- **Standalone Components** - Componentes independientes (sin NgModules)
- **Signals** - Sistema de reactividad moderno de Angular
- **OnPush Change Detection** - Estrategia optimizada de detección de cambios

---

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
Node.js >= 18.x
npm >= 11.x
Angular CLI >= 21.x
```

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/hermitage.git
   cd hermitage
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**

   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

---

## 📦 Scripts Disponibles

| Comando              | Descripción                                |
| -------------------- | ------------------------------------------ |
| `npm start`          | Inicia el servidor de desarrollo           |
| `npm run build`      | Compila el proyecto para desarrollo        |
| `npm run build-prod` | Compila para producción con optimizaciones |
| `npm test`           | Ejecuta las pruebas unitarias con Vitest   |
| `npm run watch`      | Compila en modo observación                |
| `npm run deploy`     | Despliega a GitHub Pages                   |

---

## 🏗️ Estructura del Proyecto

```
hermitage/
├── src/
│   ├── app/
│   │   ├── app.ts              # Componente principal
│   │   ├── app.html            # Template principal
│   │   ├── app.scss            # Estilos del componente
│   │   ├── app.config.ts       # Configuración de la aplicación
│   │   └── app.routes.ts       # Definición de rutas
│   ├── index.html              # HTML principal
│   ├── main.ts                 # Punto de entrada
│   └── styles.scss             # Estilos globales y variables
├── public/                     # Assets públicos
├── angular.json                # Configuración de Angular
├── tailwind.config.js          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts

```

---

## 🎨 Paleta de Colores Corporativa

```scss
Primary:    #8D2228  /* Burgundy Red - Color principal del hotel */
Secondary:  #CCDADA  /* Light Blue-Gray - Color complementario */
Accent:     #6B1A1E  /* Deep Burgundy - Acentos y hover */
Background: #F8FAFB  /* Soft Light Background */
```

---

## 📱 Secciones de la Landing Page

1. **Hero Section** - Presentación impactante con imagen de fondo
2. **Testimonios** - Reseñas de huéspedes anteriores
3. **Esencia** - Historia y filosofía del hotel
4. **Características** - Servicios y beneficios destacados
5. **Habitaciones** - Showcase de las suites disponibles
6. **Wellness** - Experiencias de spa y bienestar
7. **Contacto** - Formulario y ubicación con mapa integrado
8. **Footer** - Información corporativa y enlaces

---

## 🧪 Testing

El proyecto utiliza Vitest para pruebas unitarias:

```bash
npm test
```

---

## 🚢 Despliegue

### GitHub Pages

El proyecto está configurado para despliegue automático en GitHub Pages:

```bash
npm run deploy
```

Este comando:

1. Compila el proyecto en modo producción
2. Configura la base href para GitHub Pages
3. Despliega automáticamente a la rama `gh-pages`

### Otros Entornos

Para desplegar en otros servicios (Netlify, Vercel, etc.):

```bash
npm run build-prod
```

Los archivos compilados estarán en `dist/hermitage/browser/`

---

## 🤝 Mejores Prácticas Implementadas

- ✅ **Componentes Standalone**: Arquitectura moderna sin NgModules
- ✅ **Signals**: Sistema de reactividad de Angular 21
- ✅ **OnPush Change Detection**: Optimización de rendimiento
- ✅ **Lazy Loading**: Carga diferida de recursos
- ✅ **NgOptimizedImage**: Optimización de imágenes
- ✅ **Accesibilidad**: WCAG AA compliance
- ✅ **SEO Friendly**: Meta tags y estructura semántica
- ✅ **Mobile First**: Diseño responsive desde el inicio

---

## 📞 Contacto del Hotel

**Hermitage Boutique Hotel**

- 📍 Tandil, Buenos Aires, Argentina
- 📧 hola@hermitagetandil.com
- 📱 +54 2494 286288
- 💬 WhatsApp: +54 9 2494 556677

---

## 📄 Licencia

Este proyecto fue desarrollado para uso comercial exclusivo de Hermitage Boutique Hotel.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ para brindar la mejor experiencia digital que refleje la calidad y calidez del Hermitage Boutique Hotel.

---

<div align="center">
  <p><strong>Hermitage Boutique Hotel © 2024-2026</strong></p>
  <p>Donde la calma encuentra su hogar</p>
</div>
