const express = require('express')
const app = express();
const db = require('./db.js')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.get('/', (req, res) => {
    res.send("Hyy i am a server");
})

// ===================  ALL ROUTES ARE HERE =====================  \\

const personRoute = require('./routes/personRoutes.js');
app.use('/person', personRoute);

const menuItemRoute = require('./routes/menuItemRoutes.js');
app.use('/menu', menuItemRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

