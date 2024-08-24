import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import Slider from '../../Components/slider/slider'
export default function Home() {
    const [products, setProducts] = useState([])
    const [search, setsearch] = useState(' ');
    function getProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(({ data }) => {
                setProducts(data.data)

            })
            .catch((error) => {
                console.log(error);

            })

    }

    useEffect(() => {

        getProducts()
    }
        , [])





    return (<>
<nav className="navbar navbar-light bg-light">
  <form className="form-inline">
                <input onChange={(e)=>setsearch(e.target.value)} className="form-control my-3" type="search" placeholder="Search prodects" aria-label="Search" />
        </form>
</nav>
        <div className="row">
            {products.filter(item=>search.toLocaleLowerCase === ''? item : item.title.toLocaleLowerCase().includes(search)).map((product) =>
                <div key={product.id} className='col-md-2'>
                    <Card title={product.title} price={product.price} ratingAverage={product.ratingsAverage} categoryName={product.category.name } imageCover={product.imageCover} />
                </div>
            )
        }
        </div>



    </>
)}
