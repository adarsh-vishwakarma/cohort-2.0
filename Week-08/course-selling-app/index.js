const express = require("express");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute")
const courseRoute = require("./routes/courseRoute");
const { default: mongoose } = require("mongoose");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/course-selling-app")
    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`)
    })
}

main()