import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import ViewList from '@material-ui/icons/ViewList';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Add from "../../../node_modules/@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";

const ProductsView = ({parentId, isListView, changeListView}) => {
    return (
        <Toolbar>
            <Button href={`/createtree?parentId=${parentId}`}>New folder</Button>
            <Button href={`/createproduct?parentId=${parentId}`}>New product</Button>
            <ListItemIcon onClick={changeListView}>
                {isListView ? <ViewList/> : <FolderIcon/> }
            </ListItemIcon>
        </Toolbar>
    )
}

export default ProductsView;
