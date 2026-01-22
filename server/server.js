import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import statisticsRoutes from './routes/statistics.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build folder
const staticPath = path.join(__dirname, '../dist');
console.log('Static path:', staticPath);
app.use(express.static(staticPath));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', status: 'OK' });
});

// Statistics routes
app.use('/api/statistics', statisticsRoutes);

// Serve React app for any other routes (for SPA)
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), err => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view your application`);
});