const mongoose = require('mongoose')

const db = async() => {
    const mongoURL = 'mongodb://localhost:27017/hotels';
    try {
        await mongoose.connect(mongoURL);
        console.log("mongodb is connected...")
    } catch (error) {
        console.log(error);
    }
}

db();

module.exports = db;