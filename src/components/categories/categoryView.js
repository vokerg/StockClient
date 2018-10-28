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
import Clear from '@material-ui/icons/Clear';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const CategoryView = ({
                          category,
                          handleRemoveAttributeClick,
                          handleAddAttributeClick,
                          handleDeleteCategory,
                          handleEditCategory,
                          handleClick,
                          open,
                          classes
                      }) => {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText inset primary={category.name} onClick={handleClick}/>
                <ListItemIcon onClick={handleDeleteCategory}>
                    <Clear/>
                </ListItemIcon>
                <ListItemIcon onClick={handleEditCategory}>
                    <Create/>
                </ListItemIcon>
                <ListItemIcon onClick={handleAddAttributeClick}>
                    <Add/>
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
        </React.Fragment>
    )
}

export default withStyles(styles)(CategoryView);
