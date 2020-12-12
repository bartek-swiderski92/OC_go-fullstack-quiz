// MONGODB PW:wHvLYbe7DwLZ3ZB
// MONGODB CONNECTION: mongodb+srv://Will:<password>@cluster0.13etx.mongodb.net/<dbname>?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product')

const app = express();

mongoose.connect('mongodb+srv://Will:wHvLYbe7DwLZ3ZB@cluster0.13etx.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error)
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    product.save()
        .then(() => {
            res.status(201).json({
                product
            })
        })
        .catch((error) =>
            res.status(400).json({
                error: error
            }))
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then((thing) => {
        res.status(200).json(thing);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
})

app.get('/api/products', (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json(products);
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    });
});

module.exports = app;