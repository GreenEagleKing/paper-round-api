const { request } = require('express')
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
    const deliveriesLeft = await db.collection('round').countDocuments({delivered: false})
    response.render('index.ejs', { houses : houseItems, remainingDeliveries: deliveriesLeft,})
    
})



app.post('/addHouse', (request, response) => {
    db.collection('round').insertOne({address: request.body.house, newspaper: request.body.paper, delivered: false})
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

app.put('/markDelivered', (request, response) => {
    db.collection('round').updateOne({address: request.body.addressFromJS},{
        $set: {
            delivered: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Delivered')
        response.json('Marked Delivered')
    })
    .catch(error => console.error(error))
})

app.put('/markUnDelivered', (request, response) => {
    db.collection('round').updateOne({address: request.body.addressFromJS}, {
        $set: {
            delivered: false
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Undelivered')
        response.json('Marked Undelivered')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
