const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRoutes);

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
