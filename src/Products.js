import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedSearchTerm, setBookmarkedSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState({});

  
  const actTags = {};
  tags.forEach((t)=> {
      actTags[t.name] = false;
      if(activeTags[t.name]=== true){
        actTags[t.name] = activeTags[t.name];
      }
  });
  
  //setActiveTags();
  // Function to handle searching and filtering products
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  let filteredProducts = products;
  if(!auth.is_vip){
    filteredProducts = products.filter((p) => !p.is_vip);
  }

  for (const isActive in activeTags) {
    if(activeTags[isActive]){
      filteredProducts = filteredProducts.filter((p) => p.tags.toLowerCase().includes(isActive.toLowerCase()));
    }
  }
  // activeTags.forEach((at)=>{
  //   return
  // })

  filteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle bookmarking the search results
  const handleBookmark = () => {
    setBookmarkedSearchTerm(searchTerm);
    localStorage.setItem('bookmarkedSearchTerm', searchTerm);
  };

  // Function to handle restoring the bookmarked search results
  const handleRestoreBookmark = () => {
    const savedSearchTerm = localStorage.getItem('bookmarkedSearchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  };

  // Initialize the bookmarked search term on component mount
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('bookmarkedSearchTerm');
    if (savedSearchTerm) {
      setBookmarkedSearchTerm(savedSearchTerm);
    }
  }, []);

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
        <button onClick={handleBookmark}>Bookmark Search</button>
        <button onClick={handleRestoreBookmark}>Restore Bookmark</button>
      </div>
      <div>
        Filter by Tag
        {tags.map((t)=>{
          return(
            <button className={'clicked'+activeTags[t.name]} key={t.id} onClick={()=>{actTags[t.name] = !actTags[t.name];setActiveTags(actTags)}}>{t.name}</button>
            
          )
        })}
      </div>
      <ul>
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
          return (
            <li key={product.id}>
              {product.is_vip ? <span className = "vip">VIP </span>:''}
              <Link to={`/products/${product.id}`}>{product.name}</Link> ${product.price}
              {auth.id ? (
                cartItem ? (
                  <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                ) : (
                  <button onClick={() => createLineItem(product)}>Add</button>
                )
              ) : null}
              {auth.is_admin ? <Link to={`/products/${product.id}/edit`}>Edit</Link> : null}
              <br></br>
              {product.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
