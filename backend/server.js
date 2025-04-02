const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

// Import routes
const protestRoutes = require('./routes/protestRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const createTokenRoutes = require('./createToken');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api/protests', protestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/', createTokenRoutes);

// Server Port
const PORT = process.env.PORT || 5001;

// Start Server
app.listen(PORT, () => console.log(`server running on port ${PORT}`));