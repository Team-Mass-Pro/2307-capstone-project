import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedSearchTerm, setBookmarkedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Function to handle searching and filtering products
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  let filteredProducts = products;

  if (!auth.is_vip) {
    filteredProducts = products.filter((p) => !p.is_vip);
  }

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
      <ul>
        {currentProducts.map((product) => {
          const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
          return (
            <li key={product.id}>
              {product.is_vip ? <span className="vip">VIP </span> : ''}
              <Link to={`/products/${product.id}`}>{product.name}</Link> ${product.price}
              {auth.id ? (
                cartItem ? (
                  <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                ) : (
                  <button onClick={() => createLineItem(product)}>Add</button>
                )
              ) : null}
              {auth.is_admin ? <Link to={`/products/${product.id}/edit`}>Edit</Link> : null}
              <br />
              {product.description}
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
