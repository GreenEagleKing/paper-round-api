const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'paper-round'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Successfully connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request, response) => {
    const houseItems = await db.collection('round').find().toArray()
    response.render('index.ejs', { houses : houseItems})
})

app.post('/addHouse', (request, response) => {
    db.collection('round').insertOne({address: request.body.house, newspaper: request.body.paper, completed: false})
    .then(result => {
        console.log('New address added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('round').deleteOne({address: request.body.addressFromJS})
    .then(result => {
        console.log('Address Deleted')
        response.json('Address Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
