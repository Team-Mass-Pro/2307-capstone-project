import React, { useState, useEffect } from 'react';
import AddressAutocomplete from './AddressAutocomplete';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products,updateLineItem,decreaseLineItem })=> {

  const [address, setAddress] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);


const loadGoogleMapsScript = (callback) => {
  console.log(callback);
  const apiKey = REACT_APP_GOOGLE_API_KEY; // Google places API key
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.defer = true;
  
  script.onload = () => {
    setApiLoaded(true);

    callback();
  
  };

  document.head.appendChild(script);
};
  
  useEffect(() => {
    // Loading the Google Maps API script with the API key
    loadGoogleMapsScript(() => {
      console.log(google)
      console.log('Google Maps API script loaded.');
    });
  }, []); // Empty dependency array to run this effect only once

  if (!lineItems || lineItems.length === 0) {
    return <p>Add some items to your cart</p>;
  }

    // Calculate the total price of the items in the cart
    const cartTotal = lineItems
    .filter((lineItem) => lineItem.order_id === cart.id)
    .reduce((total, lineItem) => {
      const product = products.find((product) => product.id === lineItem.product_id) || {};
      const itemTotal = product.price * lineItem.quantity;
      return total + itemTotal;
    }, 0);

    if (!apiLoaded){
      return null;
    }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>

                { product.name }

                <button onClick={ lineItem.quantity===1 ? ()=> removeFromCart(lineItem) : ()=> decreaseLineItem(lineItem)}>-</button>
                Qty: {lineItem.quantity}
                <button onClick={ ()=> updateLineItem(lineItem)}>+</button>
                ${(product.price * lineItem.quantity)}

                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
        
        <li>Total Price: ${cartTotal.toFixed(2)}</li>
      </ul>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <>
        {/* Prior shipping address input */}
        {/* <div>Enter your shipping address:<input placeholder='address' value={ address } onChange={ ev => setAddress(ev.target.value)}/></div> */}
        <div>
        
        <AddressAutocomplete address={address} setAddress={setAddress} />
      </div>
        <button onClick={()=> {updateOrder({...cart, is_cart: false, address });}}>Create Order</button>
        </>
        : 'Add some items to your cart pls'
      }
    </div>
  );
};

export default Cart;
