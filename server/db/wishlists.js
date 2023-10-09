const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishlists = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createWishlist = async(wishlist)=> {
  const SQL = `
    INSERT INTO wishlists (id, user_id, product_id) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), wishlist.user_id, wishlist.product_id]);
  return response.rows[0];
};

module.exports = {
  fetchWishlists,
  createWishlist
};