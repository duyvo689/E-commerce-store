const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//register
router.post("/register", async (req, res) => {
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
            userName: req.body.userName
        })

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.passWord,
            process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.passWord &&
            res.status(401).json("Wrong credentials!");


        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });

    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router