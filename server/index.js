require('dotenv').config();
const express = require('express');
const pool = require('./db/db');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started 🚀'));