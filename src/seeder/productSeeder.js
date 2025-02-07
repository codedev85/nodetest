const {connectDB} = require('../config/db');  
const Product = require('../models/Product');  

connectDB();  

async function seedProducts() {
    try {
       
        const products = [
            { name: 'Laptop', price: 150 },
            { name: 'Mouse', price: 50 },
            { name: 'Keyboard', price: 50 },
        ];
        
        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        process.exit();  
    }
}

seedProducts();  
