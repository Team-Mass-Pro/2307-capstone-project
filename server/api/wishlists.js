const {
    createWishlist,
    fetchWishlists,
    deleteWishlist,
    updateWishlist

  } = require('../db');
  
const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchWishlists(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    //TODO make sure the wishlist's user_id is req.user.id 
    res.send(await createWishlist({ user_id: req.user.id, product_id: req.body.product_id}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    //TODO make sure the wishlist's user_id is req.user.id 
    await deleteWishlist({ id: req.params.id, user_id: req.user.id });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    //TODO make sure the order's user_id is req.user.id 
    res.send(await updateWishlist({...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;