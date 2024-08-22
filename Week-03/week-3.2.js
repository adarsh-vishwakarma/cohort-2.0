// npm i express
//npm i jsonwebtoken
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "adarsh@gmail.com",
        password: "123",
        name: "Adarsh Vishwakarma"
    },
    {
        username: "riya@gmail.com",
        password: "123321",
        name: "Riya Vishwakarma"
    },
    {
        username: "tripti@gmail.com",
        password: "12344321",
        name: "Tripti Vishwakarma"
    }
];

function userExists(username, password) {
    let userExists = false;
    for(let i=0; i<ALL_USERS.length; i++) {
        if(ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
            userExists = true;
            return userExists;
        }
    }
    return userExists;
}

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in memory db",
        })
    }

    var token = jwt.sign({username: username}, jwtPassword) 
    return res.json({
        token,
    })
})

app.get("/users", function(req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        res.send({
            user: ALL_USERS.filter((value) => {                
                    if(value.username === username) {
                        return true;
                    }
                    else {
                        return false
                    }                
                }              
            )
        })
    } catch (error) {
        return res.status(403).json({
            msg: "Invalid token",
        })
    }
})

app.listen(3000)



//npm i mngoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json()); // Fixed missing parentheses

mongoose.connect("mongodb://localhost:27017/");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/signup", async function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).send("User already exists");
    }

    const user = new User({
        name: username,
        email: email,
        password: password,
    });

    await user.save(); // Awaiting the save operation

    return res.json({
        "msg": "User created successfully"
    }); // Removed the extra slash and res.send
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
