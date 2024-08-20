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

