const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/wishlists', require ('./wishlists'));
app.use('/reviews', require('./reviews'));
app.use('/tags', require('./tags'));

module.exports = app;
