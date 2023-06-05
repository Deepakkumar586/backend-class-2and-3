const express = require("express");
const router = express.Router();


const { login, signup } = require("../controller/Auth");
const { auth, isStudent, isAdmin } = require("../Middleware/auth")


router.post("/login", login);
router.post("/signup", signup);


// protected route -====>ye route studnet hi dekh skta hai koi aur nhi -----authroization user hi dekh skate hai



router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to protected route for Test'
    })
})

router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to protected route for student'
    })
})



router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to protected route for Admin'
    })
})

module.exports = router;