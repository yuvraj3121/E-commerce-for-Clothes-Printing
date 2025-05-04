const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/printwear', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
