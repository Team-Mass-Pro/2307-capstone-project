import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import Product_edit from './Product_edit';
import Product_create from './Product_create';
import Orders from './Orders';
import Orders_all from './Orders_all';
import Canvas from './Canvas';
import Cart from './Cart';
import Login from './Login';
import Users from './Users';
import api from './api';
import Settings from './Settings';
import Wishlists from './Wishlists';
import Wishlists_all from './Wishlists_all';

import TempCart from './TempCart';
import OrdersMap from './OrdersMap';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersAll, setOrdersAll] = useState([]);//for admin
  const [lineItems, setLineItems] = useState([]);
  const [lineItemsAll, setLineItemsAll] = useState([]);//for admin
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);//for admin
  const [auth, setAuth] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [wishlistsAll, setWishlistsAll] = useState([]);//for admin
  const [tags, setTags] = useState([]);
  const [canvas, setCanvas] = useState(new Array(400));
  const [tempCart, setTempCart] = useState([]);

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
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchOrdersAll(setOrdersAll);
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
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchLineItemsAll(setLineItemsAll);
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
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchWishlistsAll(setWishlistsAll);
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
    await api.createWishlist(wishlist,wishlists,setWishlists,wishlistsAll,setWishlistsAll);
  }

  const deleteWishlist = async(wishlist)=> {
    await api.deleteWishlist({ wishlist, wishlists, setWishlists,wishlistsAll,setWishlistsAll });
  };

  const updateWishlist = async(wishlist)=> {
    await api.updateWishlist({wishlist, wishlists, setWishlists })
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
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchUsers(setUsers);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product,quantity)=> {
    if(quantity === undefined){
      quantity = 1;
    }
    await api.createLineItem({ product, quantity, cart, lineItems, setLineItems, lineItemsAll, setLineItemsAll });
  };

  const createProduct = async(product)=> {
    const data = await api.createProduct({ product, products, setProducts});
    navigate(`/products/${data.id}/edit`);
  };

  const createTag = async(tag)=> {
    await api.createTag({ tag, tags, setTags});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems, lineItemsAll, setLineItemsAll  });
  };

  const decreaseLineItem = async(lineItem)=> {
    lineItem.quantity = lineItem.quantity - 2;
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems, lineItemsAll, setLineItemsAll  });
  };

  const manualFetch = async()=> {
    await api.fetchOrders(setOrders);
    await api.fetchLineItems(setLineItems);
    if(auth.is_admin){
      await api.fetchOrdersAll(setOrdersAll);
      await api.fetchLineItemsAll(setLineItemsAll);
    }
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders, setOrdersAll});
  };
  
  const updateProduct = async(product)=> {
    await api.updateProduct({ product, setProducts});
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems, lineItemsAll, setLineItemsAll });
  };

  const deleteReview = async(review)=> {
    await api.deleteReview({ review, reviews ,setReviews});
  };

  const updateUser = async(user)=> {
    await api.updateUser({ user, setUsers });
  };

  let cart = orders.find(order => order.is_cart) || {};

  let cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const combineCarts = async()=> {
    tempCart.forEach((item)=>{
      const lineItemtoCombine = cartItems.find(lineI => lineI.product_id === item.product_id);
      
      if(lineItemtoCombine === undefined){
        createLineItem(products.find(p => p.id === item.product_id),item.quantity);
      }
      else{
        lineItemtoCombine.quantity += (item.quantity - 1);
        updateLineItem(lineItemtoCombine);
      }
    });

    setTempCart([]);
    await manualFetch();
  }

  if(tempCart.length && Object.keys(cart).length && products.length){
    
    combineCarts();
  }

  const createReview = async(review)=> {
    await api.createReview(review,reviews,setReviews);
    await api.fetchOrdersAll(setOrdersAll);

  }


  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
    navigate(`/`);
  }

  const register = async(user)=> {
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
    setOrders([]);
    navigate(`/`);
  }

  const goToSettings = ()=> {
    navigate (`/settings`)
  }

  return (
    <div id='foreground'>
      <h1>PAINT SHOP</h1>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/wishlists'>Wishlist ({ wishlists.length})</Link>
              <Link to='/canvas'>Canvas</Link>
            </nav>
            <div className="biggishfont">
              Welcome { auth.username }! {auth.is_vip ? "You are a VIP Member": ""}
            </div>
            <button onClick={ logout }>Logout</button>
            <button onClick={ goToSettings }>Settings</button>
            {auth.is_admin ? <div className='adminNav'><h6>Admin Tools</h6><nav>
              <Link to='/users'>Users</Link>
              <Link to='/createProduct'>Create Product</Link>
              <Link to='/allOrders'>Show Everyone's Order</Link>
              <Link to='/allWishlists'>Show All Wishlists</Link>
              <Link to='/orders-map'>Show Order History Map</Link>
              </nav></div> : ''}
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
                updateWishlist = { updateWishlist }
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
                deleteWishlist = { deleteWishlist }
                updateWishlist = { updateWishlist }
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
                updateWishlist = { updateWishlist }
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
            <Route path='/settings' element={
                <Settings
                users = {users}
                updateUser = {updateUser}
                auth = { auth }
                setAuth= { setAuth }
                />}
              />
            <Route path='/wishlists' element={
              <Wishlists
              wishlists = { wishlists }
              products = { products }
              deleteWishlist = { deleteWishlist }
              updateWishlist = { updateWishlist }
              />}
            />
            <Route path='/canvas' element={
              <Canvas
              products={products}
              canvas={canvas}
              setCanvas={setCanvas}
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
              <Route path='/createProduct' element={ 
                <Product_create
                  createProduct ={createProduct}
                  tags = {tags}
                  createTag = {createTag}
                />}
              />
              <Route path='/allOrders' element={ 
                <Orders_all
                  ordersAll = {ordersAll}
                  products = { products }
                  lineItemsAll = { lineItemsAll }
                  users = {users}
                />}
              />
              <Route path='/allWishlists' element={ 
                <Wishlists_all
                  products = { products }
                  wishlistsAll = {wishlistsAll}
                  users = {users}
                />}
              />
              <Route path='/products/:id/edit' element={ 
                <Product_edit
                  products = { products }
                  reviews = { reviews }
                  updateProduct ={updateProduct}
                  tags = {tags}
                  createTag = {createTag}
                  deleteReview = {deleteReview}
                />}
              />
                  <Route path="/orders-map" element={
                  <OrdersMap 
                  orders={ordersAll} 
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
              updateWishlist = { updateWishlist }
              tags = { tags }
              tempCart={tempCart}
              setTempCart={setTempCart}
            />
            <TempCart
              tempCart={tempCart}
              setTempCart={setTempCart}
              products={ products }
            />
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
