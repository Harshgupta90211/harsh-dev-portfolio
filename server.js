const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import Routes
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Import Middleware
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Initialize Express App
const app = express();
 
// MIDDLEWARE CONFIGURATION-
 

// Enable CORS for frontend communication
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({
  origin: clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware for incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Request Logger (Useful for learning & debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});
 
// API ROUTES
// ======

// Health Check / API Root
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Harsh Kumar's Developer Portfolio API is running smoothly!",
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      skills: '/api/skills',
      contact: '/api/contact'
    }
  });
});

// Mount Resource Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
 
// ERROR HANDLING MIDDLEWARE
// ======== 
app.use(notFound);
app.use(errorHandler);
 
// SERVER INITIALIZATION
// ====== 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Portfolio REST API Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📁 Developer: Harsh Kumar (Jaypee University Anoopshahr)`);
  console.log(`=======================================================`);
});
