import React from "react";
import { useParams } from "react-router-dom";

const Product = ({products}) => {
    <div><h1>Single Product</h1></div>

    const {id} = useParams()

    const product = products.find((product) => {
        return product.id === id
    })

    if(!product){
        return null
    }
    return(
        <div>
            <h1>{ product.name }</h1>
            <h3>Price: ${ product.price }</h3>

        </div>
    )
}

export default Product