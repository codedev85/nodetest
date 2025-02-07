const Order = require('../models/Order');

const getTotalRevenueForUser = async (userId) => {
  try {
    
    const totalRevenue = await Order.aggregate([
      {
        $match: { 
          userId: userId,  
          status: 'completed'  
        }
      },
      {
        $group: {
          _id: null,  
          totalRevenue: { $sum: "$totalAmount" }  
        }
      },
      {
        $project: {
          _id: 0,  
          totalRevenue: 1 
        }
      }
    ]);

  
    return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

  } catch (err) {

    throw new Error('Error retrieving total revenue: ' + err.message);
  }
};

const getTotalRevenueForAll = async () => {
   try {
     const totalRevenue = await Order.aggregate([
       {
         $match: { 
           status: 'completed'  
         }
       },
       {
         $group: {
           _id: null,  
           totalRevenue: { $sum: "$totalAmount" }  
         }
       },
       {
         $project: {
           _id: 0,  // Remove the _id field from the result
           totalRevenue: 1  // Only include totalRevenue in the result
         }
       }
     ]);
 
     return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
 
   } catch (err) {
     throw new Error('Error retrieving total revenue: ' + err.message);
   }
 };
 

module.exports = {
  getTotalRevenueForUser,
  getTotalRevenueForAll
};
