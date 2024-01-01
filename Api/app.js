const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserModel = require("./models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 8080;

//cross origin
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/loans", (loans = express.Router()));
require("./routes/loans")(loans);

//database connection
const uri =
  "mongodb+srv://neerajpatidar9575240:AST2015_16@cluster0.nsivpxr.mongodb.net/LoanDatabase?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

// Define routes and endpoints
app.get("/", (req, res) => {
  res.send("Web Api is Running");
});

//register user
app.post("/api/register", async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!user) {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
      });
      await newUser.save();
      res.json({ status: true });
    } else {
      res.json({ status: false, error: "Duplicate Email" });
    }
  } catch (err) {
    res.json({ status: false, error: err });
  }
});

//Login User
app.post("/api/login", async (req, res) => {
  let user = await UserModel.findOne({
    email: req.body.email,
  });
  // Compare the entered password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.json({ status: false, error: "Invalid username or password" });
  } else {
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
      },
      "Secret1234"
    );
    return res.json({ status: true, user: user, token: token });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
