import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddAttributeDialog = ({open, handleClose, name, onNameChange}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">New attribute</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={onNameChange}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Add attribute"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose(true)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default AddAttributeDialog;