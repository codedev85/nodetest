const mongoose = require('mongoose')
const redis = require('ioredis');
require('dotenv').config(); 

const  connectDB = async () => {

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Errors:", err));
}



const redisClient = redis.createClient({
  host: '127.0.0.1', 
  port: 6379,        
});


redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

 
module.exports = {connectDB,redisClient}