require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const travelRoutes = require('./routes/travelRoutes');
app.use('/api/travel', travelRoutes);

app.get('/', (req, res) => {
  res.send('RoteirizAI API - Active');
});

// Database Sync & Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    // await sequelize.sync(); // Uncomment to sync models
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
