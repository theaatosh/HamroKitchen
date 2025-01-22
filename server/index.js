const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const jwt = require("jsonwebtoken");
const router = express.Router();
const cors = require("cors");
const user = require("./models/index");
const { connectToMongoDB } = require("./connections/index");
const {
  serverSideValidation,
  checkEmail,
  registerUser,
  checkUserName,
  hashPassword,
  comparePasswords,
} = require("./controllers/index");
require("dotenv").config();
const foodItemDetails = require("./models/adminAddItem.js");
const verifyToken = require("./middleWare/verifyToken.js");
const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Array of allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, session)
  })
);

const PORT = process.env.PORT;
const mongo = process.env.URI;

connectToMongoDB(mongo)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

//routes
app.post("/signup", async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;
  console.log("Connected to signUpPage");

  // Perform server-side validation
  const validationErrors = await serverSideValidation(
    userName,
    email,
    phoneNumber,
    password
  );
  console.log(validationErrors);

  if (validationErrors) {
    console.log("Checking whether user exists or not");
    try {
      const existingUser = await checkEmail(email, userName);

      if (!existingUser) {
        let hashedPassword = await hashPassword(password);
        let user = registerUser(userName, email, phoneNumber, hashedPassword);
        if (user) {
          res.status(200).send("user registered sucessfully");
        } else {
          res.status(400).send("error while registering");
        }
      } else {
        res.status(401).send("User already exist");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("validation Error");
  }
});
//login authentication
const secretKey = process.env.JWT_SECRET;
app.post("/login", async (req, res) => {
  let { userName, password } = req.body;
  var userFound = await checkUserName(userName);
  if (userFound) {
    const matched = await comparePasswords(password, userFound.password);
    if (matched) {
      const role = await user.findById(userFound._id).select("role");
      const recData = await user.findById(userFound._id, {
        _id: 0,
        recData: 1,
      });
      let a = false;
      if (recData && Object.keys(recData.recData).length > 0) {
        a = true;
      }
      const token = jwt.sign(
        {
          userId: userFound.id,
          userName: userName,
          role: role.role,
          viewed: a,
        },
        secretKey,
        { expiresIn: "24h" }
      );
      if (role.role == "admin") {
        return res.status(200).json({ redirectTo: "http://localhost:3000/" });
      } else {
        res.status(200).json({ message: "login sucessfully", token: token });
      }
    } else {
      res.json({ message: "incorrect password" });
    }
  } else {
    res.send({ message: "user doesnt exist please register first" });
  }
});

const addItemsRoute = require("./routes/addItemsRoute.js");
app.use("/addItems", addItemsRoute);
app.use("/uploads", express.static("uploads")); // access image publicly

app.get("/topDishes", async (req, res) => {
  try {
    const foodItems = await foodItemDetails.find();
    res.status(200).send(foodItems);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch food items" });
  }
});

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate verification
});
// app.get("/api/geoCode", async (req, res) => {
//   try {
//     console.log("here");
//     const { lat, lon } = req.query;
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse`,
//       {
//         params: {
//           lat,
//           lon,
//           format: "json",
//         },
//         httpsAgent: agent,
//       }
//     );
//     console.log(response.data);
//     res.json(response.data);
//   } catch (err) {
//     console.error("Error fetching address:", err);
//     res.status(500).send("Error fetching address");
//   }
// });

const cartRoute = require("./routes/cartRoute.js");
app.use("/cart", cartRoute);

const kitchenSignUpRoute = require("./routes/kitchenSignupRoute.js");
app.use("/api/kitchenSignUp", kitchenSignUpRoute);

const manageKitchen = require("./routes/manageKitchenRoutes.js");
app.use("/api/manageKitchen", manageKitchen);

const scheduleOder = require("./routes/scheduleOrder.js");
app.use("/api/scheduleOrder", scheduleOder);

const { khalti } = require("./tryKhalti.js");
app.use("/api/khalti/init", khalti);
// app.use('/api/khalti/init/verify',khaltiCallback);

const paymentVerifyRoute = require("./routes/paymentVerifyRoute.js");
app.use("/api/khaltiVerify", paymentVerifyRoute);

const showOrder = require("./routes/showOrderRoute.js");
app.use("/api/kitchen/", showOrder);

const myOrder = require("./routes/customerMyOrderRoute.js");
app.use("/api/customer/", myOrder);

const editItem = require("./routes/adminEditItemRoute.js");
app.use("/api/editItem", editItem);

const fetchOrders = require("./placingOrder.js");
// setInterval(fetchOrders, 3*1000);

const { csvGen } = require("./csvGen.js");
csvGen();

const dashboard = require("./routes/adminDashRoute.js");
app.use("/api/dashboard", dashboard);

const recFood = require("./routes/recFoodRoute.js");
app.use("/api/recFood", recFood);

const passworddd = require("./routes/passwordRoute.js");
app.use("/api/forgotpassword", passworddd);

const { users, changeToCustomer } = require("./controllers/adminManageUser.js");
app.get("/api/users", users);

app.post("/api/changeToCustomer", changeToCustomer);

const foodRec = require("./routes/foodRecpyRoute.js");
app.use("/api/recFoods", foodRec);

const codRoute = require("./routes/codRoutes.js");
app.use("/api/cod", codRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
