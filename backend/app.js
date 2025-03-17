const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os'); // Add this to get network interfaces
const connectDB = require('./config/dbConfig');
const user = require('./routes/userRoutes');
const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const order = require('./routes/orderRoutes')
const review = require('./routes/reviewRoutes')
// const order = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test endpoint to verify server connectivity
app.get('/api/v1/test', (req, res) => {
  res.json({ 
    message: 'Server is running and accessible',
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1", user);
app.use("/api/v1/category", category);
app.use("/api/v1/product", product);
app.use("/api/v1/reviews", review);
app.use("/api/v1/orders", order)
// app.use("/api/v1/sack", sack);

// Start server - listen on all interfaces (0.0.0.0)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is accessible at http://localhost:${port}`);
  
  // Get all network interfaces
  const networkInterfaces = os.networkInterfaces();
  console.log('\nAll available network interfaces:');
  
  // Display all IPv4 addresses
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    
    for (const iface of interfaces) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`Interface: ${interfaceName} - http://${iface.address}:${port}`);
      }
    }
  }
  
  console.log('\nUse one of these URLs in your React Native app baseURL.js file.');
  console.log('Choose the IP address that matches your device\'s network.');
});