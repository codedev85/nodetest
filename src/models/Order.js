const mongoose = require('mongoose');
const Product = require('./Product');  

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      price: { type: Number, required: true },
    },
  ],
  status: {
   type: String,
   enum: ['pending', 'completed', 'cancelled'],
   default: 'pending',
 },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
