import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import Users from './Users';
import api from './api';
import Wishlists from './Wishlists';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchWishlists(setWishlists);
      };
      fetchData();
    }
  }, [auth]);
  
  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchReviews(setReviews);
      };
      fetchData();
    }
  }, [auth]);

  const createWishlist = async(wishlist)=> {
    await api.createWishlist(wishlist,wishlists,setWishlists);
  }

  const deleteWishlist = async(wishlist)=> {
    await api.deleteWishlist({ wishlist, wishlists, setWishlists });
  };

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchTags(setTags);
      };
      fetchData();
    }
  }, [auth]);
  
  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchUsers(setUsers);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const decreaseLineItem = async(lineItem)=> {
    lineItem.quantity = lineItem.quantity - 2;
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders});
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const updateUser = async(user)=> {
    await api.updateUser({ user, setUsers });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const createReview = async(review)=> {
    await api.createReview(review,reviews,setReviews);
    
  }

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const register = async(user)=> {
    //console.log(user);
    try{
    await api.register(user);
    window.alert('New User Created');
    login(user);
    } catch (ex){
      window.alert('Username Already Exists');
    }
  }
  
  const logout = ()=> {
    api.logout(setAuth);
    setUsers([]);
    navigate(`/`);
  }
  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/wishlists'>Wishlists ({ wishlists.length})</Link>
              <span>
                Welcome { auth.username }! {auth.is_vip ? "You are a VIP Member": ""}
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            {auth.is_admin ? <div className='adminNav'><h6>Admin Tools</h6><nav><Link to='/users'>Users</Link></nav></div> : ''}
            <main>
            <Routes>

              {/* This route shows multiple categories. Remember to edit the specific route too when editing this*/}
            <Route path='/' element={ 
            <>
              <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                wishlists = { wishlists }
                createWishlist = { createWishlist }
                deleteWishlist = { deleteWishlist }
                tags = { tags }
                />
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                updateLineItem = { updateLineItem }
                decreaseLineItem = { decreaseLineItem }
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />
              <Wishlists
                wishlists = { wishlists }
                products = { products }
              />
            </>
            }
            />
            <Route path='/products' element={ 
              <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                wishlists = { wishlists }
                createWishlist = { createWishlist }
                deleteWishlist = { deleteWishlist }
                tags = { tags }
              />}
            />
            <Route path='/cart' element={ 
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                updateLineItem = { updateLineItem }
                decreaseLineItem = { decreaseLineItem }
              />}
            />
            <Route path='/orders' element={ 
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />}
            />
            <Route path='/products/:id' element={ 
              <Product
                products = { products }
                reviews = { reviews }
                auth = {auth}
                createReview = {createReview}
              />}
            
            />
            <Route path='/wishlists' element={
              <Wishlists
              wishlists = { wishlists }
              products = { products }
              />}
            />
            {auth.is_admin ? <>
              <Route path='/users' element={ 
                <Users
                users = {users}
                updateUser = {updateUser}
                auth = {auth}
                setAuth = {setAuth}
                />}
              />
              </> : ''}

            </Routes>
            </main>
            </>
        ):(
          <div>
            <Login login={ login } register={ register }/>
            <Products
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
              auth = { auth }
              wishlists = { wishlists }
              createWishlist = { createWishlist }
              deleteWishlist = { deleteWishlist }
              tags = { tags }
            />
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
