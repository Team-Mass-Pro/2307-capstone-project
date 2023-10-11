const client = require('./client');

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  // fetchUsers,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews');

const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER,
      description TEXT,
      is_vip BOOLEAN NOT NULL
    );


    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL,
      address VARCHAR(255)
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      author VARCHAR(50),
      text VARCHAR(255),
      rating INTEGER
    );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false, is_vip:false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false, is_vip:false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip:true})
  ]);
  const [foo, bar, bazz] = await Promise.all([
    createProduct({ name: 'foo', price: 10, description: 'This is a test of the foo description', is_vip:false}),
    createProduct({ name: 'bar', price: 15, description: 'This is a test of the bar description', is_vip:false}),
    createProduct({ name: 'bazz', price: 20, description: 'This is a test of the bazz description', is_vip:false}),
    createProduct({ name: 'quq', price: 25, description: 'This is a test of the quq description', is_vip:false}),
    createProduct({ name: 'dodgerBlue', price: 40, description: 'official color of the Los Angeles Dodgers', is_vip:true}),
    createProduct({ name: 'aqua', price: 35, description: 'light blue with hints of green', is_vip:true}),

  ]);
  const [review1, review2, review3] = await Promise.all([
    createReview({ product_id: foo.id, author: 'lucy', text: 'good', rating: 4}),
    createReview({ product_id: bar.id, author: 'ethyl', text: 'bad', rating: 1}),
    createReview({ product_id: bazz.id, author: 'moe', text: 'ok', rating:3})
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  createUser,
  // fetchUsers,
  createReview,
  fetchReviews,
  seed,
  client
};
