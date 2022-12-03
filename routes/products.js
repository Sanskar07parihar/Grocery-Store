const express = require('express')
const router = express.Router()
const passport = require('passport')
const globals = require('./globalFunctions')

// import Region model
const Product = require('../models/product')

function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/auth/login')
  }

// GET: /products => show list of products
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.render('products/index', {
                title: 'Products', 
                products: products,
                user: req.user
            })
        }
    })
})

// GET: /products/create => display blank form
router.get('/create', isAuthenticated, (req, res) => {
    
    Product.find((err, products) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('products/create', { 
                title: 'Add Product',
                products: products,
                user: req.user
            })
        }
    }).sort('name')   
})

// POST: /products/create => process form submission
router.post('/create', isAuthenticated, (req, res) => {
    
    Product.create(req.body, (err, newProduct) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/products')
        }
    })
})

// GET: /products/delete/abc123 => remove selected Productdocument
router.get('/delete/:_id', isAuthenticated, (req, res) => {
    Product.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/products')
        }
    })
})

// GET: /products/edit/abc123 => display populated form for editing
router.get('/edit/:_id', isAuthenticated, (req, res) => {
    
    Product.find((err, products) => {
        if (err) {
            console.log(err)
        }
        else {
            // fetch selected Product for display
            Product.findById(req.params._id, (err, product) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('products/edit', { 
                        title: 'Product Details',
                        products: products,
                        user: req.user
                        
                    })
                }
            })           
        }
    }).sort('name')   
})

// POST: /products/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id', isAuthenticated, (req, res) => {
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