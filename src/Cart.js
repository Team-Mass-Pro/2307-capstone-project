import React, { useState } from 'react';


const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products,updateLineItem,decreaseLineItem })=> {

  const [address, setAdress] = useState('');

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
        <div>Enter your shipping address:<input placeholder='address' value={ address } onChange={ ev => setAdress(ev.target.value)}/></div>
        <button onClick={()=> {updateOrder({...cart, is_cart: false, address });}}>Create Order</button>
        </>
        : 'Add some items to your cart pls'
      }
    </div>
  );
};

export default Cart;
