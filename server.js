const express = require('express');
const path = require('path');
const app = express();

// Cambia el nombre del directorio si es necesario (ej. 'dist/front-slan')
app.use(express.static(path.join(__dirname, 'dist/front-slan')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-slan', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
