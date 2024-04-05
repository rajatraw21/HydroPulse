// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connections');
const signupRoutes = require('./routes/signupRoutes');
const reportRoutes = require('./routes/reportRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
