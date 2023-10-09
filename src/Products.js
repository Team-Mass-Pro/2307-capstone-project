import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Products</h2>
      <div>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name} ${product.price}</Link>

              {auth.id ? (
                cartItem ? (
                  <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                ) : (
                  <button onClick={() => createLineItem(product)}>Add</button>
                )
              ) : null}
              {auth.is_admin ? <Link to={`/products/${product.id}/edit`}>Edit</Link> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
