const mongoose = require('mongoose');

const connectDb = async () => mongoose.connect(process.env.MONGO).then(() => console.log(`the mongoose is connected`)).catch(err => console.error(`the mongoose error ${err}`))

module.exports = connectDb