    const {
    createReview,
    fetchReviews
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      //TODO make sure the order's user_id is req.user.id
      res.send(await createReview({ ...req.body, id: req.params.id}));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await fetchReviews(req.user.id));
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;
  