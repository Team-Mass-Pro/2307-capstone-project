import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({wishlist, deleteWishlist}) => {
    return (
      <div>
        {
          <button onClick={ () => deleteWishlist(wishlist)}>Remove From Wishlist</button> 
        }
      </div>
    )
  }

const UpdateRating = ({wishlist, updateWishlist}) => {
    if(wishlist.rating > 1){
        return (
            <div>
                {
                    <button onClick={ () => updateWishlist(wishlist)}>↑</button> 
                }
            </div>
        )
    }else
        return (
            <div>
                {
                    <button onClick={ () => updateWishlist(wishlist)}>↓</button>
                }
            </div>
        )
}
  

const Wishlists = ({products, wishlists, deleteWishlist, updateWishlist}) => {

    console.log(wishlists)
    return (
        <div>
            <h1>You have {wishlists.length} items on your wishlist.</h1>
            <ol>
                {
                    wishlists.map( product => {
                        let id = product.product_id;
                        const thisProduct = products.find(p => p.id === id);
                        return (
                            <li key= {product.id }>
                                <Link to={`/products/${thisProduct.id}`}>{(thisProduct.name)}</Link> ${thisProduct.price}   
                                {
                                    <UpdateRating wishlist = {wishlists.find(wishlist => wishlist.product_id === thisProduct.id)}
                                    updateWishlist = { updateWishlist }
                                    />
                                }
                                {
                                    <Wishlist wishlist = { wishlists.find(wishlist => wishlist.product_id === thisProduct.id) }
                                    deleteWishlist = { deleteWishlist }
                                    />
                                }
                            </li>
                        )    
                    })
                }
            </ol>
        </div>

    )

}



export default Wishlists;