const order = require("../models/orderModel");
const user = require("../models/index");

const cod = async (req, res) => {
  const { paymentMethod } = req.body;
  const { userId } = req.user;
  const orderStatus = "Onprocess";
  const alreadySaveOrder = await order.findOne({
    userId: userId,
    orderStatus: orderStatus,
  });
  if (alreadySaveOrder !== null) {
    const orderId = alreadySaveOrder._id.toString();
    try {
      await order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            orderStatus: "processedWithPayment",
            paymentStatus: "paid",
            paymentDetails: "yet to be paid",
            paymentMode: paymentMethod,
          },
        },
        { new: true }
      );
    } catch (err) {
      console.log("error while updating payment status" + err);
    }
    try {
      const h = await user.findOneAndUpdate(
        { _id: userId },
        {
          $unset: {
            cart: "",
          },
        },
        { new: true }
      );
    } catch (err) {
      console.log("error while removing item from cart" + err);
      await order.findOneAndUpdate(
        { _id: orderId },
        {
          $unset: {
            orderStatus: "",
            paymentStatus: "",
            paymentDetails: "",
            paymentMode: "",
          },
        },
        { new: true }
      );
    }
    res.status(200).json({ message: "order placed successfully" });
  } else {
    res.status(400).json({ message: "error while placing order" });
  }
};
module.exports = cod;
