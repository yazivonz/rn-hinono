const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const user = require('./routes/userRoutes');
const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
// const order = require('./routes/orderRoutes');


const app = express();
const port = process.env.PORT || 8080; // Ensure this matches your .env PORT=8080

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB
connectDB();


// Routes
app.use("/api/v1", user);
app.use("/api/v1/category", category);
app.use("/api/v1/product", product);
// app.use("/api/v1/sack", sack);

// Start server - listen on all interfaces (0.0.0.0)
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Server is accessible at http://localhost:${port}`);
    console.log(`For local network access: http://192.168.1.3:${port}`);
});