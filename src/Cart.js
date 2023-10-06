import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products,updateLineItem,decreaseLineItem })=> {
  let sum = 0;
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            sum += product.price*lineItem.quantity;
            return (
              <li key={ lineItem.id } className='flex'>

                <span className='double'>
                { product.name.length < 20 ? product.name : product.name.substring(1,20)+"..." }
                </span>
                <span>
                <button onClick={ lineItem.quantity===1 ? ()=> removeFromCart(lineItem) : ()=> decreaseLineItem(lineItem)}>-</button>
                Qty: {lineItem.quantity}
                <button onClick={ ()=> updateLineItem(lineItem)}>+</button>
                </span>
                <span>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </span>
              </li>
            );
          })
        }
      </ul>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <><div>Price: ${(sum/100).toFixed(2)}</div><button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button></>: 'Add some items to your cart pls'
      }
    </div>
  );
};

export default Cart;
