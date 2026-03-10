import "./polyfill.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Signup from "./Routes/Signup.js";
import Menuitem from "./Routes/Menuitem.js";
import Item from "./Routes/Item.js";
import Expense from "./Routes/Expense.js";
import Login from "./Routes/Login.js";
import Upload from "./Routes/Upload.js";
import Order from "./Routes/Order.js";
import Payment from "./Routes/Payment.js";
import Pics from "./Routes/Testimonials.js";
import Review from "./Routes/Review.js";
import Issue from "./Routes/Issue.js";
import "dotenv/config";

const app = express();

// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
  origin: [
    "http://localhost:3000", // For your local development
    "https://food-app-ochre-pi.vercel.app" // For your Vercel deployment (NO trailing slash!)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());
const mongodbURL = process.env.MONGODBURL;

// NOTE: I completely removed your custom app.use((req, res, next) => {...}) block 
// because the cors() package above handles all of those headers automatically and safely!

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", Signup);
app.use("/", Menuitem);
app.use("/", Item);
app.use("/", Expense);
app.use("/", Login);
app.use("/", Upload);
app.use("/", Order);
app.use("/", Payment);
app.use("/", Pics);
app.use("/", Review);
app.use("/", Issue);

const port = process.env.PORT || 4000; // Better practice for deployment

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
    .connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 20000 })
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
    });
});