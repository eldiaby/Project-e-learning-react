import React, { useState } from 'react'
import products from './products';

export default function Product() {

    const [product, setProduct] = useState(products)

    const [editItems, setEditItems] = useState([])

    const handleChange = e => {
        setEditItems(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleDelete = id => {
        const itemAfterDelete = product.filter((items) => {
            return items.id !== id
        })
        setProduct(itemAfterDelete)
    }

    const handleUpdate = id => {
        let itemAfterUpdate = product.map((item) => {
            if (item.id === id) {
                return editItems
            }
            else {
                return item
            }
        })
        setProduct(itemAfterUpdate)
    }

    const handleAdd = e => {

        e.preventDefault()

        let newProduct = editItems

        setProduct([newProduct, ...product])

    }


    return (
        <>
            <div className='table-responsive m-5'>
                <table className="table caption-top">
                    <caption className='fw-bold fs-3 mb-3'>Products
                        <button className='btn btn-success ms-5' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
                    </caption>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">Item#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Product</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((items, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td scope='row'>{i + 1}</td>
                                            <td style={{ textAlign: 'justify' }}>{items.title}</td>
                                            <td>{items.category}</td>
                                            <td style={{ textAlign: 'justify' }}>{items.description}</td>
                                            <td>{items.price}</td>
                                            <td><img style={{ width: '60px' }} src={items.image} alt="internet-error" /></td>

                                            <td className='text-center'><button className='btn btn-info outline-0' data-bs-toggle="modal" data-bs-target="#editModal"
                                                onClick={() => { setEditItems(items) }}>Edit</button>
                                                <button className='btn btn-danger mt-2' onClick={() => { handleDelete(items.id) }}>Delete</button></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Items</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input type="text" name='id' className='form-control' onChange={handleChange} placeholder='Id' />
                                <input type="text" name='title' className='form-control mt-3' onChange={handleChange} placeholder='Title' />
                                <input type="text" name='category' className='form-control mt-3' onChange={handleChange} placeholder='Category' />
                                <textarea name='description' className='form-control mt-3 w-100' onChange={handleChange} rows="5" placeholder='Description'></textarea>
                                <input type="text" name='price' className='form-control mt-3' onChange={handleChange} placeholder='Price' />
                                <input type="text" name='image' className='form-control mt-3' onChange={handleChange} placeholder='Image Link' />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAdd}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Items</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input type="text" name='id' className='form-control' value={editItems.id} onChange={handleChange} placeholder='Type Id' />
                                <input type="text" name='title' className='form-control mt-3' onChange={handleChange} value={editItems.title} placeholder='Type Title' />
                                <input type="text" name='category' className='form-control mt-3' onChange={handleChange} value={editItems.category} placeholder='Type Category' />
                                <textarea name='description' className='form-control mt-3 w-100' onChange={handleChange} value={editItems.description} rows="5" placeholder='Type Description'></textarea>
                                <input type="text" name='price' className='form-control mt-3' onChange={handleChange} value={editItems.price} placeholder='Type Price' />
                                <input type="text" name='image' className='form-control mt-3' onChange={handleChange} value={editItems.image} placeholder='Type Product' />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => { handleUpdate(editItems.id) }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
