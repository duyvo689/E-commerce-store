const router = require("express").Router();

router.get("/usertest", (req, res) => {
    res.send("user is seuccess")
})

router.post("/userport", (req, res) => {
    const userName = req.body.userName;
    res.send("user name: " + userName)
})
module.exports = router