const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
<<<<<<< HEAD
    INSERT INTO products (id, name, price, description, is_vip, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.description, product.is_vip, product.tags]);
=======
    INSERT INTO products (id, name, description) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.description]);
>>>>>>> 7a38177 (added descriptions to all products under product)
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct
};
