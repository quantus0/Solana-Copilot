const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.use(errorHandler);

module.exports = app;