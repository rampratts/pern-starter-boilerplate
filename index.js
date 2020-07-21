require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
  
app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log('Server started 🚀'));