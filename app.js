const express = require('express');
const mysql = require("mysql")
const path = require("path")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

dotenv.config({ path: './.env'})

const app = express();
const port = 5432

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDir = path.join(__dirname, './assets')

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.set('view engine', 'hbs')

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})


app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

app.get("/verify", (req, res) => {
    res.render("verify")
})

app.post("/auth/register", (req, res) => {    
    const { id, surname, other_names, email, phoneNumber, phoneNumber_veri, DOB} = req.body;

    db.query('INSERT INTO users (surname, other_names, email, phoneNumber, DOB) VALUES (?, ?, ?, ?, ?)', [surname, other_names, email, phoneNumber, DOB], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.redirect('/');
     
    });
});

app.listen(process.env.PORT || port, ()=> 
    console.log('listening on port ${port}'))
