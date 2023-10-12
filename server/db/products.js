const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async () => {
  const SQL = `
    SELECT *
    FROM products
    ORDER BY created_at
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products (id, name, price, description, is_vip, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), product.name, product.price, product.description, product.is_vip, product.tags]);
  return response.rows[0];
};

const updateProduct = async(product)=> {
  SQL = `
    UPDATE products
    SET price = $1, name = $3, description = $4, is_vip = $5
    WHERE id = $2
    RETURNING *
  `;
  const response = await client.query(SQL, [product.price, product.id, product.name, product.description, product.is_vip]);
  return response.rows[0];
};
module.exports = {
  fetchProducts,
  createProduct,
  updateProduct
};

