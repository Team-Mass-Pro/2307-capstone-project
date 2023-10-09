import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  //const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState({});
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
        await api.fetchReviews(setReviews);
      };
      fetchData();
    }
  }, [auth]);
  
  // useEffect(()=> {
  //   if(auth.id){
  //     const fetchData = async()=> {
  //       await api.fetchUsers(setUsers);
  //     };
  //     fetchData();
  //   }
  // }, [auth]);

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
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
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
            />
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
