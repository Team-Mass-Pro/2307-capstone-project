const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishlists = async(userId)=> {
  const SQL = `
    SELECT * FROM wishlists
    WHERE user_id = $1
    
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

const fetchWishlistsAll = async()=> {
  const SQL = `
    SELECT * FROM wishlists
    ORDER BY product_id
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

const deleteWishlist = async(wishlist)=> {
  const SQL = `
    DELETE from wishlists
    WHERE id = $1 AND user_id = $2
  `;
  await client.query(SQL, [wishlist.id, wishlist.user_id]);
};

const updateWishlist = async(wishlist)=> {
  const SQL = `
  UPDATE wishlists
  SET rating = $1 
  WHERE id = $2 AND user_id = $3
  RETURNING *
  `;
  const response = await client.query(SQL, [wishlist.rating, wishlist.id, wishlist.user_id]);
  return response.rows[0];
}

module.exports = {
  fetchWishlists,
  fetchWishlistsAll,
  createWishlist,
  deleteWishlist,
  updateWishlist
};