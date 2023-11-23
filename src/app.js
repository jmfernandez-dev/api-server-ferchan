require('dotenv').config();

const express = require('express');

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded());


// routes
app.use(require('./routes/user'));
app.use(require('./routes/auth'));

// server init
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})


