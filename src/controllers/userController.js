// const { response } = require('..');
const userService = require('../services/userService');
const UserService = require('../services/userService');

const User = require('../models/User');


exports.register = async (req, res) => {

      try{
        
     
         const { name , email , password} = req.body;

         const existingUser = await User.findOne({ email });

         if (existingUser) {
             return res.status(400).json({ errors: [{ msg: "Email already in use" }] });
         }

         const user =  await UserService.registerUser(name , email , password);

         return res.status(200).json({success : true , user})

      }catch(err){

         return res.status(500).json({success:false , message : err.message})
         
      }

}


exports.login = async (req,res) => {
   try{
      const {email , password} = req.body
      const {user , token } = await UserService.loginUser(email, password)
      return res.status(201).json({success: true , user , token})
   }catch(err){
      return res.status(400).json({success:false ,  message : err.message})
   }
}


exports.users  = async (req, res) => {
   const users = await userService.fetchUsers();
   return res.status(200).json({success: true , users})
}

exports.userProfile  = async (req, res) => {
   const userId = req.user.id; 
   const users = await userService.getMyProfile(userId);
   return res.status(200).json({success: true , users})
}