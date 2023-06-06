const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        // enum means ---> role ka space limit ho jata hai jo ab role hai vo enum ke inside jo bhi value hai unme se koi ak hoga
        enum: ["Admin", "Student", "Visitor"],
    }

})
module.exports = mongoose.model("user", userSchema);
