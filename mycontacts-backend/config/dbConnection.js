const monoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await monoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}, ${conn.connection.name}`);
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;