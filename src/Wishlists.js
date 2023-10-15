import React from 'react';
import { Link } from 'react-router-dom';

const Wishlists = ({products, wishlists, deleteWishlist}) => {
    
    return (
        <div>
            <h1>You have {wishlists.length} items on your wishlist.</h1>
            <ul>
                {
                    wishlists.map( product => {
                        let id = product.product_id;
                        const thisProduct = products.find(p => p.id === id);
                        return (
                            <li key= {product.id }>
                                 <Link to={`/products/${thisProduct.id}`}>{(thisProduct.name)}</Link> ${thisProduct.price}
                            </li>
                        )    
                    })
                }
            </ul>
        </div>

    )

}



export default Wishlists;