const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path");
const sessions = require("express-session");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const flash = require("connect-flash");
const ejs = require("ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const port = 6969;
const {connection} = require("./config/db")
const { test } = require("./config/db")
const middlewares = require("./middleware/middleware");
app.use(middlewares.hello)



const postRoute = require("./routes/auth");
app.use("/",postRoute)
app.use("/",postRoute);
app.use("/",postRoute);

app.listen(port,() => {
    console.log(`server running on http://localhost:${port}/`)
})


test();

app.get("/",(req,res) => {
    res.send("hello world");
})
