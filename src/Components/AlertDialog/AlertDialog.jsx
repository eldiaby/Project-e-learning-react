import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Store/Slices/CartSlice';

export default function AlertDialog({ prodId }) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletProd = () => {
        setOpen(false);
        dispatch(removeFromCart(prodId))
    }

    return (
        <React.Fragment>
            <Button variant="outlined"  color="error" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this product ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>no</Button>
                    <Button onClick={() => { deletProd() }} autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
