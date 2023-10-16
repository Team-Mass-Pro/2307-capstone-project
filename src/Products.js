import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Wishlist = ({product, wishlist, createWishlist, deleteWishlist}) => {
  return (
    <span>
      {
        wishlist ? <button onClick={ () => deleteWishlist(wishlist)} className="rounded">Remove From Wishlist</button> 
        : <button onClick = { () => createWishlist ({ product_id: product.id})} className="rounded">Wishlist</button>
      }
    </span>
  ) 
}

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishlists, createWishlist, deleteWishlist, tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedSearchTerm, setBookmarkedSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  const actTags = {};
  tags.forEach((t) => {
    actTags[t.name] = false;
    if (activeTags[t.name] === true) {
      actTags[t.name] = activeTags[t.name];
    }
  });

  //setActiveTags();
  // Function to handle searching and filtering products
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  let filteredProducts = products;
  if (!auth.is_vip) {
    filteredProducts = products.filter((p) => !p.is_vip);
  }

  for (const isActive in activeTags) {
    if (activeTags[isActive]) {
      filteredProducts = filteredProducts.filter((p) => p.tags.toLowerCase().includes(' '+ isActive.toLowerCase() + ' '));
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
      setCurrentPage(1); // Reset to the first page when restoring bookmarks
    }
  };

  // Initialize the bookmarked search term on component mount
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('bookmarkedSearchTerm');
    if (savedSearchTerm) {
      setBookmarkedSearchTerm(savedSearchTerm);
    }
  }, []);

  // Calculate the range of products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
        <button onClick={handleBookmark}>Bookmark Your Search Results</button>
        <button onClick={handleRestoreBookmark}>Restore Saved Bookmark</button>
      </div>
      <div>
        Filter by Tag
        {tags.map((t) => {
          return (
            <button className={'clicked' + activeTags[t.name] + ' tags'} key={t.id} onClick={() => { actTags[t.name] = !actTags[t.name]; setActiveTags(actTags) }}>{t.name}</button>

          )
        })}
      </div>
      <ul className='flexpaints'>

        {currentProducts.map((product) => {
          const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
          const css = `
            #product${(product.name).replace(" ", "_")}{
              background-color: rgb(${product.red},${product.green},${product.blue});
            }
          `;
          return (
            
            <li key={product.id} id={`product${(product.name).replace(" ", "_")}`} className='product'>
              <style>{css}</style>
              {product.is_vip ? <span className="vip">VIP </span> : ''}
              <Link to={`/products/${product.id}`}>{product.name}</Link> ${product.price}

              <div>{product.description}</div>
              
              {auth.id ? (
                cartItem ? (
                  <button onClick={() => updateLineItem(cartItem)} className="rounded">Add Another</button>
                ) : (
                  <button onClick={() => createLineItem(product)} className="rounded">Add</button>
                )
              ) : null}
              {
                auth.id ? <Wishlist product={ product } wishlist = { wishlists.find(wishlist => wishlist.product_id === product.id) }
                createWishlist = { createWishlist } deleteWishlist = { deleteWishlist }
                />: null
              }
              
              {auth.is_admin ? <Link to={`/products/${product.id}/edit`}>Edit</Link> : null}
            </li>
          );
        })}
      </ul>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= filteredProducts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

/*
{
auth.id ? <Wishlist product={ product } wishlist = { wishlists.find(wishlist => wishlist.product_id === product.id) }
createWishlist = { createWishlist } deleteWishlist = { deleteWishlist }
/>: null
}
      */