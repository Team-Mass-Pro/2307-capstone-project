import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({product, wishlist, createWishlist, deleteWishlist}) => {
    return (
      <div>
        {
          <button onClick={ () => deleteWishlist(wishlist)}>Remove From Wishlist</button> 
        }
      </div>
    )
  }
  

const Wishlists = ({products, wishlists, deleteWishlist}) => {
    return (
        <div>
            <h1>You have {wishlists.length} items on your wishlist.</h1>
            <ul>
                {
                    wishlists.map( product => {
                        console.log(product)
                        let id = product.product_id;
                        const thisProduct = products.find(p => p.id === id);
                        return (
                            <li key= {product.id }>
                                 <Link to={`/products/${thisProduct.id}`}>{(thisProduct.name)}</Link> ${thisProduct.price}   
                                {
                                    <Wishlist wishlist = { wishlists.find(wishlist => wishlist.product_id === thisProduct.id) }
                                    deleteWishlist = { deleteWishlist }
                                    />
                                }
                            </li>
                        )    
                    })
                }
            </ul>
        </div>

    )

}



export default Wishlists;