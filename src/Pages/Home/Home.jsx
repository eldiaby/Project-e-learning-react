import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../Components/Card/Card';



const categories = ['All', "Men's Fashion", "Women's Fashion"];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                setProducts(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = products
        .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
        .filter(product => selectedCategory === 'All' || product.category.name === selectedCategory);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / cardsPerPage);

    const currentPageProducts = filteredProducts.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container my-4">
            <div className="row mb-4">
                <div className="col-md-9">
                    <div className="form-inline">
                        <input
                            onChange={handleSearchChange}
                            className="form-control w-100"
                            type="search"
                            placeholder="Search products"
                            aria-label="Search"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-inline">
                        <select
                            className="form-control w-100"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        {currentPageProducts.length > 0 ? (
                            currentPageProducts.map(product => (
                                <div key={product.id} className="col-md-3 mb-3">
                                    <Card
                                        title={product.title}
                                        price={product.price}
                                        ratingAverage={product.ratingsAverage}
                                        categoryName={product.category.name}
                                        imageCover={product.imageCover}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products found</p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
