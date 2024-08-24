import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../Components/Card/Card';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                setProducts(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (currentPage > Math.ceil(filteredProducts.length / cardsPerPage)) {
            setCurrentPage(1);
        }
    }, [search, filteredProducts, cardsPerPage, currentPage]);

    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = filteredProducts.slice(firstCardIndex, lastCardIndex);

    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline w-100">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control w-100"
                        type="search"
                        placeholder="Search products"
                        aria-label="Search"
                    />
                </form>
            </nav>
            <div className="container my-4">
                <div className="row">
                    {currentCards.length > 0 ? (
                        currentCards.map(product => (
                            <div key={product.id} className='col-md-3 mb-3'>
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
            </div>
        </>
    );
}
