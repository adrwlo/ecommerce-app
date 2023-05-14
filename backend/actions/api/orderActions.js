const Order = require("../../db/models/order");

class OrderActions {
  async saveOrder(req, res) {
    try {
      const orderData = req.body.order;
      const order = new Order(orderData);
      const savedOrder = await order.save();
      res.status(200).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new OrderActions();
