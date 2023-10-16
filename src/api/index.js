import axios from 'axios';
import Wishlists_all from '../Wishlists_all';

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

const fetchOrdersAll = async(setOrdersAll)=> {
  const response = await axios.get('/api/orders/all', getHeaders());
  setOrdersAll(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchLineItemsAll = async(setLineItemsAll)=> {
  const response = await axios.get('/api/lineItems/all', getHeaders());
  setLineItemsAll(response.data);
};

const fetchWishlists = async(setWishlists)=> {
  const response = await axios.get('/api/wishlists', getHeaders());
  setWishlists(response.data);
}

const fetchWishlistsAll = async(setWishlistsAll)=> {
  const response = await axios.get('/api/wishlists/all', getHeaders());
  setWishlistsAll(response.data);
}

const createWishlist = async(wishlist, wishlists,setWishlists, wishlistsAll, setWishlistsAll) => {
  const response = await axios.post('/api/wishlists', wishlist, getHeaders());
  setWishlists([...wishlists, response.data])
  setWishlistsAll([...wishlistsAll, response.data]);
}

const deleteWishlist = async({ wishlist, wishlists, setWishlists, wishlistsAll, setWishlistsAll})=> {
  const response = await axios.delete(`/api/wishlists/${wishlist.id}`, getHeaders());
  setWishlists(wishlists.filter( _wishlist => _wishlist.id !== wishlist.id));
  setWishlistsAll(wishlistsAll.filter( _wishlist => _wishlist.id !== wishlist.id));
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

const createLineItem = async({ product, cart, lineItems, setLineItems, lineItemsAll, setLineItemsAll })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
  setLineItemsAll([...lineItemsAll, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems, lineItemsAll, setLineItemsAll  })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
  setLineItemsAll(lineItemsAll.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders, setOrdersAll })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  let response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
  response = await axios.get('/api/orders/all', getHeaders());
  setOrdersAll(response.data);
};

const updateUser = async({ user, setUsers })=> {
  await axios.put(`/api/users/${user.id}`, user, getHeaders());
  const response = await axios.get('/api/users', getHeaders());
  setUsers(response.data);
};

const updateProduct = async({ product, setProducts })=> {
  await axios.put(`/api/products/${product.id}`, product, getHeaders());
  const response = await axios.get('/api/products', getHeaders());
  setProducts(response.data);
};

const createProduct = async({ product, products, setProducts })=> {
  const response = await axios.post('/api/products', product, getHeaders());
  setProducts([...products, response.data]);
  return response.data;
}
const createTag = async({ tag, tags, setTags })=> {
  const response = await axios.post('/api/tags', tag, getHeaders());
  setTags([...tags, response.data]);
}
const removeFromCart = async({ lineItem, lineItems, setLineItems,  lineItemsAll, setLineItemsAll   })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
  setLineItemsAll(lineItemsAll.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const deleteReview = async({ review, reviews, setReviews})=> {
  const response = await axios.delete(`/api/reviews/${review.id}`, getHeaders());
  setReviews(reviews.filter( r => r.id !== review.id));
  console.log("1984");
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
  fetchOrdersAll,
  fetchLineItems,
  fetchLineItemsAll,
  fetchUsers,
  fetchTags,
  createLineItem,
  updateLineItem,
  fetchWishlists,
  fetchWishlistsAll,
  createWishlist,
  deleteWishlist,
  updateOrder,
  updateUser,
  updateProduct,
  createProduct,
  createTag,
  removeFromCart,
  createReview,
  deleteReview,
  fetchReviews,
  attemptLoginWithToken
};

export default api;
