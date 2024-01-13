const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const db = mysql.createPool({
    user: process.env.dbuser,
    host: process.env.dbhost, 
    password: process.env.dbpw,
    database: process.env.dbschema
});


app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`, (err, result) => {
        if (err) {
            res.send(err)
        }
        if (result && result.length == 0) {
            res.send("not found")
        } else {
            res.send(result)
        }
    })
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username.length > 30 || password.length > 30 || password.length < 8 || username.length < 3) {
        res.send("E1")
        return;
    }
    db.query(`INSERT INTO users (username, password) VALUES ("${username}", "${password}")`, (err, result) => {
        if (err) {
            res.send("E2")
            return;
        }
        res.send("OK")
    })
})

app.post('/add', (req, res) => {
    const user = req.body.user
    const anime = req.body.anime
    if (anime === undefined) res.send("error, anime is undefined")
    db.query(`CREATE TABLE IF NOT EXISTS user${user} (
                  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  anime VARCHAR(255) NOT NULL UNIQUE
              ) ENGINE=INNODB`, (err, result) => {
        if (err) {
            res.send(err)
        }
    })
    db.query(`INSERT IGNORE INTO user${user} (anime) VALUES ("${anime}")`, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/get-list', (req, res) => {
    const user = req.body.user
    if (user === -1) {
        res.status(404).send([])
        return;
    }
    db.query(`SELECT * FROM user${user}`, (err, result) => {
        if (err) {
            res.end()
        }
        res.send(result)
    })
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})