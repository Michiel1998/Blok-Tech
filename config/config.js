require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.DB_URI;

const connectDb = async () => {

    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

        console.log("Connection succesful")
    } catch (err) {
        console.log(`Failed to connect: ${err}`)
        throw err
    }
}

module.exports = {
    connectDb
}