import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import products from './products';

export default function Product() {
    const [product, setProduct] = useState(products);
    const [editItems, setEditItems] = useState({});
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleChange = e => {
        setEditItems({ ...editItems, [e.target.name]: e.target.value });
    };

    const handleDelete = id => {
        setItemToDelete(id);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = () => {
        const itemAfterDelete = product.filter(item => item.id !== itemToDelete);
        setProduct(itemAfterDelete);
        setOpenConfirmDialog(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setOpenConfirmDialog(false);
        setItemToDelete(null);
    };

    const handleUpdate = () => {
        setProduct(product.map(item => item.id === editItems.id ? editItems : item));
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        setProduct([editItems, ...product]);
        setOpenAddDialog(false);
    };

    return (
        <>
            <div className='table-responsive m-5'>
                <table className="table caption-top">
                    <caption className='fw-bold fs-3 mb-3'>
                        Products
                        <Button variant="contained" color="success" onClick={() => setOpenAddDialog(true)} style={{ marginLeft: '16px' }}>
                            Add Product
                        </Button>
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
                        {product.map((item, i) => (
                            <tr key={item.id}>
                                <td scope='row'>{i + 1}</td>
                                <td style={{ textAlign: 'justify' }}>{item.title}</td>
                                <td>{item.category}</td>
                                <td style={{ textAlign: 'justify' }}>{item.description}</td>
                                <td>{item.price}</td>
                                <td><img style={{ width: '60px' }} src={item.image} alt="internet-error" /></td>
                                <td className='text-center'>
                                    <Button variant="contained" color="info" onClick={() => { setEditItems(item); setOpenEditDialog(true); }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(item.id)} style={{ marginTop: '8px' }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <TextField
                        name='id'
                        label='Id'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                    />
                    <TextField
                        name='title'
                        label='Title'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                    />
                    <TextField
                        name='category'
                        label='Category'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                    />
                    <TextField
                        name='description'
                        label='Description'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        multiline
                        rows={4}
                        onChange={handleChange}
                    />
                    <TextField
                        name='price'
                        label='Price'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                    />
                    <TextField
                        name='image'
                        label='Image Link'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">Add</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Product Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        name='id'
                        label='Id'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={editItems.id || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        name='title'
                        label='Title'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={editItems.title || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        name='category'
                        label='Category'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={editItems.category || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        name='description'
                        label='Description'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        multiline
                        rows={4}
                        value={editItems.description || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        name='price'
                        label='Price'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={editItems.price || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        name='image'
                        label='Image Link'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={editItems.image || ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirmDialog} onClose={cancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="secondary">Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
