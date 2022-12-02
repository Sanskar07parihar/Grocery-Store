const express = require('express')
const router = express.Router()

// import Region model
const Product = require('../models/product')

// GET: /products => show list of products
router.get('/', (req, res) => {
    // query the model to fetch & pass the region data to the view
    Product.find((err, products) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('products/index', { 
                title: 'Products',
                products: products
            })
        }
    })  
})

// GET: /products/create => show blank product form
router.get('/create', (req, res) => {
    res.render('products/create', { title: 'Add Product'})
})

// POST: /products/create => process form submission
router.post('/create', (req, res) => {
    // create a new Region document from the fields in the form post
    Product.create(req.body, (err, newProduct) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/products')
        }
    })
})

// GET: /employers/delete/abc123 => remove selected Employer document
router.get('/delete/:_id', (req, res) => {
    Product.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/products')
        }
    })
})

// GET: /employers/edit/abc123 => display populated form for editing
router.get('/edit/:_id', (req, res) => {
    // get regions for Form dropdown
    Product.find((err, products) => {
        if (err) {
            console.log(err)
        }
        else {
            // fetch selected Employer for display
            Product.findById(req.params._id, (err, product) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('products/edit', { 
                        title: 'Product Details',
                        products: products,
                        
                    })
                }
            })           
        }
    }).sort('name')   
})

// POST: /employers/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id', (req, res) => {
    Product.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, product) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/products')
        }
    })
})

// make public
module.exports = router