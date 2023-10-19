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

const UpdateRating = ({wishlist, updateWishlist, wishlists}) => {
    const max = wishlists.length -1
    if(wishlist.rating === 0){
        return (
            <div>
                Current Priority: {wishlist.rating + 1}
                {
                    <button onClick={ () => updateWishlist(wishlist) && wishlist.rating++}>↓</button>
                }
            </div>
        )
    } else if (wishlist === wishlists[max]){
            return (
                <div>
                    Current Priority: {wishlist.rating + 1}
                    {
                        <button onClick={ () => updateWishlist(wishlist) && wishlist.rating--}>↑</button>
                    }
                 </div>
            )
    } else if(wishlist.rating <= max){
        return (
            <div>
                Current Priority: {wishlist.rating + 1}
                {
                    <button onClick={ () => updateWishlist(wishlist) && wishlist.rating--}>↑</button> 
                }            
                {
                    <button onClick={ () => updateWishlist(wishlist) && wishlist.rating++}>↓</button>
                }
            </div>    
        )    
    } else {
        return (
            <div>
                Current Priority: {wishlist.rating + 1}
                {
                    <button onClick={ () => updateWishlist(wishlist) && wishlist.rating--}>↑</button> 
                }        
            </div>
        )
    }    
}
  

const Wishlists = ({products, wishlists, deleteWishlist, updateWishlist}) => {
    wishlists.sort((firstItem, secondItem) => firstItem.rating - secondItem.rating);
    console.log(wishlists)
    return (
        <div>
            <h1>You have {wishlists.length} items on your wishlist.</h1>
            <p>Click the arrows to begin changing the priority of products on your wishlist!
                Multiple products can have the same priority, with a maximum of 1.
            </p>
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
                                    updateWishlist = { updateWishlist } wishlists = { wishlists }
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