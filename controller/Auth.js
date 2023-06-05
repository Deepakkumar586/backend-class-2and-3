const bycrypt = require("bcrypt");
const User = require("../modal/User");
const jwt = require("jsonwebtoken")

require("dotenv").config();




//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        // if user pahle se signup kiya hai to 
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: 'user already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bycrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in Hashing password'

            });
        }

        // create user if not exist in databse

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });

    }
    catch (err) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'user can not created please try again later',

        });
    }
}


// Logiin method

exports.login = async (req, res) => {
    try {
        // data fetch for login user
        const { email, password } = req.body;

        // validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details carefully ",
            });
        }

        // checkkk for register user
        const user = await User.findOne({ email });

        // if not a register user
        if (!user) {
            return res.status(401).jsonn({
                success: false,
                message: "user is not register",
            });
        }


        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,

        }

        // verify password and generate a jwt token
        if (await bycrypt.compare(password, user.password)) {
            // for password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h',
                })

            // user.token = token;
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
                httpOnly: true, //httpOnly means client side par access na kar pana
            }


            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully"
            })

        }
        else {
            // password does not match case

            return res.status(403).json({
                success: false,
                message: 'passowrd incoorect'
            })
        }



    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        })

    }
}

