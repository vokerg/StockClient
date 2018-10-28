import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import Category from './category';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

const CategoriesView = ({classes, categories, newCategory, history}) => {
    return (
        <div className={classes.root}>
            <Button onClick={newCategory}>New catetgory</Button>
            <List
                component="nav"
                subheader={<ListSubheader component="div">Categories</ListSubheader>}
            >
                {categories.map(category =>
                    <Category key={category.id} category={category} history={history}/>
                )}
            </List>
        </div>
    )
}


export default withStyles(styles)(CategoriesView);
