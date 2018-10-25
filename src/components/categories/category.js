import React from 'react';

import {connect} from 'react-redux';

import {addAttribute, deleteAttribute, deleteCategory} from "../../actions";
import CategoryView from "./categoryView";
import AddAttributeDialog from "./addAttributeDialog";

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class Category extends React.PureComponent {
    state = {
        open: false,
        newAttributeOpen: false,
        newAttributeName: ""
    };

    handleClick = () => this.setState({open: !this.state.open});

    handleAddAttributeClick = event => this.setState({newAttributeOpen: true});

    handleDialogClose = ok => () =>
        (ok) ?
            this.props.addAttribute(this.props.category.id, {name: this.state.newAttributeName})
            : this.setState({newAttributeOpen: false, newAttributeName: ""});

    onNewAttributeNameChange = event => this.setState({newAttributeName: event.target.value});

    handleRemoveAttributeClick = attributeId => () => this.props.deleteAttribute(this.props.category.id, attributeId);

    handleDeleteCategory = () => this.props.deleteCategory(this.props.category.id);

    render() {
        const {category} = this.props;
        const {open, newAttributeOpen, newAttributeName} = this.state;
        return (
            <React.Fragment>
                <CategoryView
                    category={category}
                    handleRemoveAttributeClick={this.handleRemoveAttributeClick}
                    handleAddAttributeClick={this.handleAddAttributeClick}
                    handleDeleteCategory={this.handleDeleteCategory}
                    handleClick={this.handleClick}
                    open={open}
                />
                <AddAttributeDialog
                    open={newAttributeOpen}
                    handleClose={this.handleDialogClose}
                    name={newAttributeName}
                    onNameChange={this.onNewAttributeNameChange}
                />
            </React.Fragment>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    addAttribute: (categoryId, attribute) => dispatch(addAttribute(categoryId, attribute)),
    deleteAttribute: (categoryId, attributeId) => dispatch(deleteAttribute(categoryId, attributeId)),
    deleteCategory: categoryId => dispatch(deleteCategory(categoryId))
})

export default connect(() => ({}), mapDispatchToProps)(Category);
