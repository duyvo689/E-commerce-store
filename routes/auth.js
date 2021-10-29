const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//register
router.post("/regiter", async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        passWord: CryptoJS.AES.encrypt(req.body.passWord, process.env.PASS_SEC).toString(),

    });

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//login
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({
            userName: req.body.UserName
        })

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.passWord && res.status(401).json(user)

        const accessToken = jwt.sign({
            id: user._id,
            isAdimin: user.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "3d" })

        const { passWord, ...others } = user._doc;
        res.status(200).json(...others, accessToken)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router