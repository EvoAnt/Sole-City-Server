var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res, next) => {
    const search = new RegExp(req.query.search, 'i') 
    Product.find({
        $or: [
            { brand: { $regex: search } },
            { name: { $regex: search } }
        ]
    })
    .limit(8)
    .then((results) => {
        results = results.map((result) => {
            return {...result._doc}
        })
        console.log('search results', results)
        res.json({ results })
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router;