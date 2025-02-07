// const jwt = require('jsonwebtoken')


// exports.authenticateUser = (req, res, next) => {


//    try{

//    const authHeader = req.headers('Authorization');

//    if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
//       }
        
//     const token = authHeader.split(" ")[1];

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the decoded userId to request object
//     req.user = decoded.userId;

//    }catch(err){
//       return res.status(401).json({success:false , message: "invalid Token"});
//    }

// }

const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
   try {
      
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({
            success: false, 
            message: 'Unauthorized: No token provided or invalid token format'
         });
      }

     
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.userId;

     
      next();

   } catch (err) {
      return res.status(401).json({
         success: false,
         message: 'Unauthorized: Invalid or expired token'
      });
   }
};
