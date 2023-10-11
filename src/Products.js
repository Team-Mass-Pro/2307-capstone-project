import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({product, wishlist, createWishlist, deleteWishlist}) => {
  return (
    <div>
      {
        wishlist ? <button onClick={ () => deleteWishlist(wishlist)}>Remove From Wishlist</button> 
        : <button onClick = { () => createWishlist ({ product_id: product.id}) }>Add to Wishlist</button>
      }
    </div>
  )
}

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishlists, createWishlist, deleteWishlist})=> {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                { <Link to={`/products/${product.id}`}> { product.name } </Link> }${product.price}

                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
                {
                  auth.id ? <Wishlist product={ product } wishlist = { wishlists.find(wishlist => wishlist.product_id === product.id) }
                  createWishlist = { createWishlist } deleteWishlist = { deleteWishlist }
                  />: null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
