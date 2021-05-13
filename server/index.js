const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { response } = require('express')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost', 
    password: process.env.dbpw,
    database: 'anihub'
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`, (err, result) => {
        if (err) {
            res.send(err)
        }
        if (result.length == 0) {
            res.send("not found")
        } else {
            res.send(result)
        }
    })
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username.length > 30 || password.length > 30) {
        res.send("E1")
    }
    db.query(`INSERT INTO users (username, password) VALUES ("${username}", "${password}")`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('/add', (req, res) => {
    const user = req.body.user
    const anime = req.body.anime
    db.query(`CREATE TABLE IF NOT EXISTS ${user} (
                  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  anime VARCHAR(255) NOT NULL
              ) ENGINE=INNODB`, (err, result) => {
        if (err) {
            res.send(err)
        }
    })
    db.query(`INSERT INTO ${user} (anime) VALUES ("${anime}")`, (err, result) => {
        if (err) {
            res.send(err)
        }
    })
})

app.post('/get-list', (req, res) => {
    const user = req.body.user
    db.query(`SELECT * FROM ${user}`, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log("server running on port " + 3001)
})