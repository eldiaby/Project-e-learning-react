import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="filter">
            <h5>Filter by Category</h5>
            <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
