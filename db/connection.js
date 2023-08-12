const mongoose = require('mongoose');

const { DB_HOST } = process.env;

const mongoConnectDB = async() => {
    await mongoose.connect(DB_HOST);
};

module.exports = mongoConnectDB;