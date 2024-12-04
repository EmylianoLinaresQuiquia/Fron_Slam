const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // URL base de tu aplicación Angular
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    retries: {
      runMode: 2, // Reintentos en modo headless
      openMode: 0, // Reintentos en modo interactivo
    },
    defaultCommandTimeout: 8000, // Tiempo de espera para comandos
    requestTimeout: 10000, // Tiempo de espera para solicitudes HTTP
  },
});
