const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;


// use cookie-parser use --->jb cookie se token ko fetch karte hai
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// middleware handle
app.use(express.json());

require("./config/databse").connect();

// route ko imort karo aur mount
const user = require("./routes/user");
app.use("/newAway", user);


//activate server
app.listen(4000, () => {
    console.log("App is Start at 4000");

})

