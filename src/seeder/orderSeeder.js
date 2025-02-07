const {connectDB} = require('../config/db');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User'); 

connectDB();

async function seedOrders() {
  try {
    

    const products = await Product.find();

    if (products.length === 0) {
      console.log('No products found, please seed products first.');
      return;
    }

    const users = await User.find(); 
    if (users.length === 0) {
      console.log('No users found, please create users first.');
      return;
    }
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Example orders
    const orders = [
      {
        userId: randomUser._id, 
        items: [
          { product: products[0]._id, price: products[0].price }, 
          { product: products[1]._id, price: products[1].price }, 
        ],
        status: 'completed',
      },
      {
        userId: randomUser._id, 
        items: [
          { product: products[1]._id, price: products[1].price }, 
          { product: products[2]._id, price: products[2].price }, 
        ],
        status: 'pending',
      },
    ];

      // Calculate total amount for each order dynamically
      orders.forEach(order => {
         let totalAmount = 0;
         order.items.forEach(item => {
           totalAmount += item.price; 
         });
         order.totalAmount = totalAmount; 
       });
   
    await Order.insertMany(orders);
    console.log('Orders seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
}

seedOrders();
