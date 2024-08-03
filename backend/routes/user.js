const express = require("express");
const router1 = express.Router();



const {login, signup} = require("../controllers/Auth");
// const {auth, isStudent,isAdmin} = require("../middlewares/auth");

router1.post("/login", login);
router1.post("/signup", signup);
module.exports = router1;