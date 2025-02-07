const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {redisClient} = require('../config/db');

class userService{

  static  async registerUser(name ,email ,password){
      const hashedPassword = await bcrypt.hash(password,10)
      const user = new User({name , email, password:hashedPassword})
      return await user.save()
     
   }

   static async loginUser(email, password){

     const user = await User.findOne({email});

     if(!user) throw new Error('Invalid credentials')

     const isMatch = await  bcrypt.compare(password , user.password);

     if(!isMatch) throw new Error('Invalid password')

      const token = jwt.sign({userId : user._id },process.env.JWT_SECRET,{expiresIn :'1h'})

      return {user,token}
   
   }

   static fetchUsers = async () => {
     const  users = await  User.find()

     return users
   }

   static getMyProfile = async (userId) => {
    try {
      
      const cachedUser = await new Promise((resolve, reject) => {
        redisClient.get(userId, (err, data) => {
          if (err) reject(err);
          if (data) resolve(JSON.parse(data)); 
          else resolve(null);
        });
      });

      if (cachedUser) {
        console.log('Returning cached user profile');
        return cachedUser;
      }

      
      const user = await User.findOne({ userId: userId });

      if (!user) {
        throw new Error('User not found');
      }

    
      await new Promise((resolve, reject) => {
        redisClient.setex(userId, 3600, JSON.stringify(user), (err, reply) => {
          if (err) reject(err);
          resolve(reply);
        });
      });

      console.log('Returning fresh user profile and caching it');
      return user;
    } catch (error) {
      throw new Error('Error retrieving user profile: ' + error.message);
    }
  }


}

module.exports = userService;