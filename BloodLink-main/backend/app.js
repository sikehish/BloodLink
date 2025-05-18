const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3177;

dotenv.config();

app.use(cors({
  origin: "http://bloodlink-frontend.s3-website.ap-south-1.amazonaws.com",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

mongoose.connect("mongodb+srv://sparshmishra1:sparshmishra1@cluster0.m5ycaxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (e) => {
	console.log(e ? e : "Connected successfully to database");
});

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

app.listen(port, "0.0.0.0", () =>
	console.log(`Server running at http://0.0.0.0:${port}`)
);