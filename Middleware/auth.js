


// three middleware ak authentication ke liye and 2 authroization ke liye ===> isStudent,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // extract jwt token-->request ki body se token ko fecth...
        // other ways two token fetch
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: true,
                message: "Token missing"
            })
        }

        // verify the token 
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)


            // decode  ka jo bhi data nikl aayega use request ke sath add kar liya
            req.user = payload;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is valid"
            })
        }

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Somethings went worng,while verify the token "
        });



    }

}


//for isTSudent  for authorization

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role != "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for students"
            })
        }
        next();



    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching "
        });



    }

}



// Admin  route for authorization

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role != "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin"
            })
        }
        next();



    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching "
        });



    }

}