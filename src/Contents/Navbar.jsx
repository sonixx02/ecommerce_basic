import React from "react";

const Navbar = ({ categories, onCategoryChange, selectedCategory }) => {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <nav className="navbar">
      <div className="nav-item">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
