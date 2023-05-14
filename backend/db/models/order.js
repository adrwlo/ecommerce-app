const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  products: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      desc: { type: String, required: true },
      amount: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  deliveryMethod: { type: String, required: true },
  deliveryCost: { type: String, required: true },
  isPackagePaid: { type: Boolean, required: true },
  quantity: { type: String, required: true },
  total: { type: String, required: true },
  totalAfterDelivery: { type: String, required: true },
  discountAmount: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
