import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Create from '@material-ui/icons/Create';
import Remove from '@material-ui/icons/Remove';

import AddAttributeDialog from './addAttributeDialog';


const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const CategoryView = ({
                          category,
                          newAttributeOpen,
                          handleDialogClose,
                          newAttributeName,
                          onNewAttributeNameChange,
                          handleRemoveAttributeClick,
                          handleAddAttributeClick,
                          handleDeleteCategory,
                          handleClick,
                          open,
                          classes
                      }) => {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText inset primary={category.name} onClick={handleClick}/>
                <ListItemIcon onClick={handleDeleteCategory}>
                    <Remove/>
                </ListItemIcon>
                <ListItemIcon onClick={handleAddAttributeClick}>
                    <Create/>
                </ListItemIcon>
                <span onClick={handleClick}>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </span>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {category.categoryAttributes.map(attribute =>
                        <ListItem key={attribute.id} className={classes.nested}>
                            <ListItemText inset primary={attribute.name}/>
                            <ListItemIcon onClick={handleRemoveAttributeClick(attribute.id)}>
                                <Remove/>
                            </ListItemIcon>
                        </ListItem>
                    )}
                </List>
            </Collapse>
            <AddAttributeDialog
                open={newAttributeOpen}
                handleClose={handleDialogClose}
                name={newAttributeName}
                onNameChange={onNewAttributeNameChange}
            />
        </React.Fragment>
    )
}

export default withStyles(styles)(CategoryView);
