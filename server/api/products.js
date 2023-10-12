const {
  fetchProducts,
  updateProduct,
  createProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  res.send(await updateProduct({ ...req.body, id: req.params.id}));
});

app.post('/', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    //TODO make sure the order's user_id is req.user.id
    res.send(await createProduct({ ...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});
module.exports = app;
