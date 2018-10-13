import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Create from '@material-ui/icons/Create';
import Remove from '@material-ui/icons/Remove';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import AddAttributeDialog from './addAttributeDialog';
import {addAttribute, removeAttribute, removeCategory} from '../../api';


const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class Category extends React.PureComponent {
    state = {open: false, newAttributeOpen: false, newAttributeName: ""};
    handleClick = () => this.setState({open: !this.state.open});

    handleAddAttributeClick = event =>
        this.setState({newAttributeOpen: true});

    handleDialogClose = ok => () => {
        if (ok) {
            addAttribute(this.props.category.id, {name: this.state.newAttributeName})(response => console.log(response));
        }
        this.setState({newAttributeOpen: false, newAttributeName: ""});
    }
    onNewAttributeNameChange = event => this.setState({newAttributeName: event.target.value});
    handleRemoveAttributeClick = attributeId => () => {
        console.log(attributeId);
        removeAttribute(this.props.category.id, attributeId)(() => console.log("removed!"));
    };
    handleDeleteCategory = () => removeCategory(this.props.category.id)(() => console.log("category removed"));

    render() {
        const {category, classes} = this.props;
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemText inset primary={category.name} onClick={this.handleClick}/>
                    <ListItemIcon onClick={this.handleDeleteCategory}>
                        <Remove/>
                    </ListItemIcon>
                    <ListItemIcon onClick={this.handleAddAttributeClick}>
                        <Create/>
                    </ListItemIcon>
                    <span onClick={this.handleClick}>
            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
          </span>
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.categoryAttributes.map(attribute =>
                            <ListItem className={classes.nested}>
                                <ListItemText inset primary={attribute.name}/>
                                <ListItemIcon onClick={this.handleRemoveAttributeClick(attribute.id)}>
                                    <Remove/>
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </List>
                </Collapse>
                <AddAttributeDialog
                    open={this.state.newAttributeOpen}
                    handleClose={this.handleDialogClose}
                    name={this.state.newAttributeName}
                    onNameChange={this.onNewAttributeNameChange}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Category);
