import React from 'react';

const Orders = ({ orders, products, lineItems })=> {

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {
          
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            //-Eli Calculate the total for this order
            const orderTotal = orderLineItems.reduce((total, lineItem) => {
              const product = products.find((product) => product.id === lineItem.product_id) || {};
              return total + lineItem.quantity * product.price;
            }, 0);
            return (
              <li key={ order.id }>
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
      </ul>
    </div>
  );
};

export default Orders;
