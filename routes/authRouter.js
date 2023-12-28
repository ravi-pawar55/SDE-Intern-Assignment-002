const express = require("express")
const router = express.Router()

const {
    signup,
    signin,
    getMe
} = require("../controllers/auth");

const {
    validateSignup,
    validateSignin
} = require("../middlewares/validation");

const { auth }= require("../middlewares/auth");

router.post("/signup", validateSignup ,signup);
router.post("/signin", validateSignin ,signin);
router.get("/me", auth, getMe);

module.exports = router;