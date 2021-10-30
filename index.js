const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successfull!"))
    .catch((err) => {
        console.log(err)
    });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server")
})