import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'

export default function Home() {
    const [products, setProducts] = useState([])
    function getProducts() {

        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(({ data }) => {
                setProducts(data.data)
               console.log(products);
               
            })
            .catch((error) => {
                console.log(error);

            })

    }

    useEffect(() => {

        getProducts()
    }
        , [])





    return <>
        <div className="row">

            {products.map((product) =>
                <div key={product.id} className='col-md-2'>
                    <Card product={product} />
                </div>
            )
            }
        </div>


    </>
}
