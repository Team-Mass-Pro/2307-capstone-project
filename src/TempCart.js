import React, { useState, useEffect } from 'react';

const TempCart = ({ tempCart,setTempCart, products})=> {

  if (!tempCart || tempCart.length === 0) {
    return <p>Add some items to your cart</p>;
  }

    // Calculate the total price of the items in the cart
    const cartTotal = tempCart
    .reduce((total, lineItem) => {
      const product = products.find((product) => product.id === lineItem.product_id) || {};
      const itemTotal = product.price * lineItem.quantity;
      return total + itemTotal;
    }, 0);
  

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          tempCart.map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={`tempCartItem${product.id}`}>

                { product.name }

                <button onClick={ lineItem.quantity===1 ? ()=> setTempCart(tempCart.filter((lineItem) => lineItem.product_id !== product.id)) : ()=> setTempCart(tempCart.map((lineItem) => lineItem.product_id === product.id ? {product_id:product.id,quantity:lineItem.quantity-1}:lineItem))}>-</button>
                Qty: {lineItem.quantity}
                <button onClick={ ()=> setTempCart(tempCart.map((lineItem) => lineItem.product_id === product.id ? {product_id:product.id,quantity:lineItem.quantity+1}:lineItem))}>+</button>
                ${(product.price * lineItem.quantity)}

                <button onClick={ ()=> setTempCart(tempCart.filter((lineItem) => lineItem.product_id !== product.id))}>Remove From Cart</button>
              </li>
            );
          })
        }
        
        <li>Total Price: ${cartTotal.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default TempCart;
