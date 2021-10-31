const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successfull!"))
    .catch((err) => {
        console.log(err)
    });

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auths", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server")
})