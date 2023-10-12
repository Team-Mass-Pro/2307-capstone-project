import axios from 'axios';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};


const fetchWishlists = async(setWishlists)=> {
  const response = await axios.get('/api/wishlists', getHeaders());
  setWishlists(response.data);
}

const createWishlist = async(wishlist, wishlists,setWishlists) => {
  const response = await axios.post('/api/wishlists', wishlist, getHeaders());
  setWishlists([...wishlists, response.data])
}

const deleteWishlist = async({ wishlist, wishlists, setWishlists })=> {
  const response = await axios.delete(`/api/wishlists/${wishlist.id}`, getHeaders());
  setWishlists(wishlists.filter( _wishlist => _wishlist.id !== wishlist.id));
};

const fetchReviews = async(setReviews)=> {
  const response = await axios.get('/api/reviews', getHeaders());
  setReviews(response.data);
};

const fetchTags = async(setTags)=> {
  const response = await axios.get('/api/tags', getHeaders());
  setTags(response.data);
};

const createReview = async(review,reviews,setReviews)=> {
  console.log(review);
  const response = await axios.post('/api/reviews', review, getHeaders());
  setReviews([...reviews, response.data]);
}

const fetchUsers = async(setUsers)=> {
  try{
  const response = await axios.get('/api/users', getHeaders());
  setUsers(response.data);
  }catch(ex){
    setUsers([]);
  }
}

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const updateUser = async({ user, setUsers })=> {
  await axios.put(`/api/users/${user.id}`, user, getHeaders());
  const response = await axios.get('/api/users', getHeaders());
  setUsers(response.data);
};

const updateProduct = async({ product, setProducts })=> {
  console.log(`/api/products/${product.id}`);
  await axios.put(`/api/products/${product.id}`, product, getHeaders());
  const response = await axios.get('/api/products', getHeaders());
  setProducts(response.data);
};

const createProduct = async({ product, products, setProducts })=> {
  const response = await axios.post('/api/products', product, getHeaders());
  setProducts([...products, response.data]);
  return response.data;
}

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const register = async(user)=> {
  //console.log(user);
  const response = await axios.post('/api/users',user);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const api = {
  login,
  register,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchUsers,
  fetchTags,
  createLineItem,
  updateLineItem,
  fetchWishlists,
  createWishlist,
  deleteWishlist,
  updateOrder,
  updateUser,
  updateProduct,
  createProduct,
  removeFromCart,
  createReview,
  fetchReviews,
  attemptLoginWithToken
};

export default api;
