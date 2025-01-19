const user = require("../models/index");
const users = async (req, res) => {
  try {
    const customer = await user.find({
      role: { $in: ["customer", "pending"] },
    });
    const kitchen = await user.find({ role: "kitchen" });
    if (customer && kitchen) {
      res.status(200).json({ customers: customer, kitchens: kitchen });
    } else if (!kitchen && !customer) {
      res.status(400).json({ message: "no user to show" });
    } else if (customer && !kitchen) {
      res
        .status(201)
        .json({ customers: customer, message: "No kitchens available" });
    }
  } catch (err) {
    console.log(err);
  }
};

const changeToCustomer = async (req, res) => {
  const { id } = req.body;
  try {
    const userFound = await user.findByIdAndUpdate(
      id,
      {
        $set: {
          role: "customer",
          cookLocation: "",
          cookStatus: "offline",
          cookFoodItem: "",
        },
      },
      { new: true }
    );
    if (userFound) {
      res.status(200).json({ message: "role changed to customer" });
    } else {
      res.status(400).json({ message: "error while changing role" });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { users, changeToCustomer };
