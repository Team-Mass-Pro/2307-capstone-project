const client = require('./client');
const path = require('path');
const fs = require('fs');

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  fetchUsers,
  updateUser,
  findUserByToken,
  updateAvatar
} = require('./auth');
console.log(updateAvatar);

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const {
  createWishlist,
  fetchWishlists,
  deleteWishlist
} = require('./wishlists')

const {
  createReview,
  fetchReviews
} = require('./reviews');

const {
  fetchTags,
  createTag
} = require('./tags');

const loadAvatar = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, 'base64', (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        //data:[<mediatype>][;base64],<data>
        resolve(`data:image/png;base64,${result}`);
      }
    });
  });
};

const seed = async () => {
  const SQL = `

  DROP TABLE IF EXISTS wishlists;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS tags;
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
    is_vip BOOLEAN NOT NULL,
    avatar TEXT
  );

  CREATE TABLE products(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    name VARCHAR(100) UNIQUE NOT NULL,
    price INTEGER,
    description TEXT,
    is_vip BOOLEAN NOT NULL,
    tags TEXT
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

  CREATE TABLE tags(
    id UUID PRIMARY KEY,
    name VARCHAR(50)
  );

  CREATE TABLE wishlists(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    CONSTRAINT product_and_user_key UNIQUE(product_id, user_id)
  )
  `;
  await client.query(SQL);

  const moeAvatar = await loadAvatar('images/moe.png');
  const lucyAvatar = await loadAvatar('images/lucy.png');
  const ethylAvatar = await loadAvatar('images/ethyl.png');

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false, is_vip: false, avatar: moeAvatar }),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false, is_vip: false, avatar: lucyAvatar }),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip: true, avatar: ethylAvatar })
  ]);


  const [foo, bar, bazz] = await Promise.all([
    createProduct({ name: 'red', price: 10, description: 'color of passion', is_vip: false, tags: 'red primary' }),
    createProduct({ name: 'green', price: 15, description: "nature's color", is_vip: false, tags: 'secondary' }),
    createProduct({ name: 'pink', price: 20, description: 'like red but cuter', is_vip: false, tags: 'red light' }),
    createProduct({ name: 'blue', price: 25, description: 'calming color', is_vip: false, tags: 'blue primary' }),
    createProduct({ name: 'black', price: 5, description: 'absense of light', is_vip: false, tags: 'monochrome dark' }),
    createProduct({ name: 'yellow', price: 15, description: 'fills you with joy', is_vip: false, tags: 'yellow primary' }),
    createProduct({ name: 'orange', price: 20, description: "the color of oranges", is_vip: false, tags: 'secondary' }),
    createProduct({ name: 'white', price: 5, description: 'white', is_vip: false, tags: 'monochrome light' }),
    createProduct({ name: 'purple', price: 30, description: "Very valuable in olden times", is_vip: true, tags: 'secondary vip' }),
    createProduct({ name: 'dodgerBlue', price: 40, description: 'official color of the Los Angeles Dodgers', is_vip: true, tags: 'special blue vip' }),
    createProduct({ name: 'aqua', price: 35, description: 'light blue with hints of green', is_vip: true, tags: 'special blue light vip' }),
    createProduct({ name: 'gold', price: 50, description: 'yellow for royals', is_vip: true, tags: 'special yellow vip' })
  ]);

  const [review1, review2, review3] = await Promise.all([
    createReview({ product_id: foo.id, author: 'lucy', text: 'good', rating: 4 }),
    createReview({ product_id: bar.id, author: 'ethyl', text: 'bad', rating: 1 }),
    createReview({ product_id: bazz.id, author: 'moe', text: 'ok', rating: 3 })
  ]);

  const tags = await Promise.all([
    createTag({ name: 'blue' }),
    createTag({ name: 'dark' }),
    createTag({ name: 'light' }),
    createTag({ name: 'monochrome' }),
    createTag({ name: 'red' }),
    createTag({ name: 'yellow' }),
    createTag({ name: 'primary' }),
    createTag({ name: 'secondary' }),
    createTag({ name: 'special' }),
    createTag({ name: 'vip' })
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id });
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
  createWishlist,
  fetchWishlists,
  deleteWishlist,
  updateOrder,
  authenticate,
  findUserByToken,
  createUser,
  fetchUsers,
  updateUser,
  updateAvatar,
  createReview,
  fetchReviews,
  seed,
  fetchTags,
  createTag,
  client
};
