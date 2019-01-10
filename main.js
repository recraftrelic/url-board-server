const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const protoDB = require('proto-db')

const app = express()
const port = 3000

const db = new protoDB(path.join(__dirname, './db'))

db.createStore('url-board')
db.setStore('url-board')
db.createTable('urls')

// enable body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post(
    '/urls',
    (req, res) => {

        db.table('urls').create(req.body)

        db.table('urls').get().then(
            records =>
                res.json(records)
        )

    }
)

app.get(
    '/urls',
    (req, res) =>
        db.table('urls').get().then(
            records =>
                res.json(records)
        )
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))