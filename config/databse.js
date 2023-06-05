const mongoose = require("mongoose");


require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("DB connected Successfull")
        })
        .catch((err) => {
            console.log("DB connected ISSues");
            console.error(err);
            process.exit(1); //kuchh bhi code fta  to exit ho jayega
        })

}