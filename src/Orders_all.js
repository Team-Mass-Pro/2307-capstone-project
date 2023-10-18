import React from 'react';

const Orders_all = ({ ordersAll, products, lineItemsAll, users })=> {

  return (
    <div>
      <h2>All Orders on Site</h2>
      {ordersAll.map( order => {
            const orderLineItems = lineItemsAll.filter(lineItem => lineItem.order_id === order.id);

            //-Eli Calculate the total for this order
            const orderTotal = orderLineItems.reduce((total, lineItem) => {
              const product = products.find((product) => product.id === lineItem.product_id) || {};
              return total + lineItem.quantity * product.price;
            }, 0);
            if(orderLineItems.length === 0){return}
            return (
              <li key={ order.id }>
                <h3>Order Made By {users.length?(users.find((u)=> u.id === order.user_id)).username:''}</h3>
                <h4>{order.is_cart ? "THIS ORDER IS STILL IN CART":""}</h4>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' }
                          ({lineItem.quantity})
                          ${lineItem.quantity * product.price}                        
                        </li>
                      );
                    })
                  }
                </ul>
                <p>Total Price for this Order: ${orderTotal.toFixed(2)}</p>
                <p>Shipping Destination: {order.address === null || order.address === "" ? "N/A" : order.address}</p>
              </li>
            );
          })
          }
    </div>
  );
};

export default Orders_all;
