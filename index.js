const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes/auth.routes');

const { AppDataSource } = require('./src/config/data-source');
const User = require('./src/entities/User');
const Contact = require('./src/entities/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get('/', (_req, res) => {
  res.send('API funcionando 🧃');
});

app.use('/api/auth', authRoutes);

// Inicializar base de datos y servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando a la base de datos', err);
  });