import React from 'react';
import { Link } from 'react-router-dom';

const Wishlists_all = ({products,wishlistsAll,users}) => {

    return (
        <div>
            {
            users.map(u => {

                const singleWishlist = wishlistsAll.filter(item => item.user_id === u.id);

                return(
                    <div key= {u.id }>
                    <h2>{u.username} has {singleWishlist.length} items wishlisted</h2>
                    <ul>
                    {
                    singleWishlist.map( product => {
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
            })
                
            
            }
        </div>

    )

}



export default Wishlists_all;