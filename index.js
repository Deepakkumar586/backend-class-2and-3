const express = require("express");
const app = express();

// require("dotenv").config();
// const PORT = process.env.PORT;


app.use(express.json());

require("./config/databse").connect();

// route ko imort karo aur mount
const user = require("./routes/user");
app.use("/api/v1", user);


//activate server
app.listen(4000, () => {
    console.log("App is Start at 4000");

})

