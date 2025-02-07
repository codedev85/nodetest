const {getTotalRevenueForUser , getTotalRevenueForAll} = require('../services/orderService');

exports.getTotalMyRevenue = async (req, res) => {
  try {
   
    const userId = req.user.id; 
    
    const totalRevenue = await getTotalRevenueForUser(userId);
    
    return res.status(200).json({
      success: true,
      totalRevenue
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getTotalRevenue = async (req, res) => {
   try {
    
     const userId = req.user.id; 
     
     const totalRevenue = await getTotalRevenueForAll();
     
     return res.status(200).json({
       success: true,
       totalRevenue
     });
   } catch (err) {
     return res.status(500).json({
       success: false,
       message: err.message
     });
   }
 };
