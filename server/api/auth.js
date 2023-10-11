const {
  authenticate,
  findUserByToken,
  createUser,
  updateUser,
  fetchUsers
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin  } = require('./middleware');


app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});


app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});

app.post('/users', async(req, res, next)=> {
  try {
    //
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/users', isLoggedIn, isAdmin, async(req, res, next)=> {
   try {
     res.send(await fetchUsers(req.user.id));
   } 
   catch(ex){
     next(ex);
   }
 });

 app.put('/users/:id', isLoggedIn, async(req, res, next)=> {
  
  res.send(await updateUser({ ...req.body, id: req.params.id}));
});
module.exports = app;
