import React from 'react';

import {connect} from 'react-redux';

import {addAttribute} from "../../actions";
import {removeAttribute, removeCategory} from '../../api';
import CategoryView from "./categoryView";



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
            this.props.addAttribute(this.props.category.id, {name: this.state.newAttributeName});
        }
        this.setState({newAttributeOpen: false, newAttributeName: ""});
    }
    onNewAttributeNameChange = event => this.setState({newAttributeName: event.target.value});
    handleRemoveAttributeClick = attributeId => () =>
        removeAttribute(this.props.category.id, attributeId)((response) => console.log(response));

    handleDeleteCategory = () => removeCategory(this.props.category.id)(response => console.log(response));

    render() {
        const {category} = this.props;
        const {open, newAttributeOpen, newAttributeName} = this.state;
        return (
            <CategoryView
                category={category}
                newAttributeOpen={newAttributeOpen}
                handleDialogClose={this.handleDialogClose}
                newAttributeName={newAttributeName}
                onNewAttributeNameChange={this.onNewAttributeNameChange}
                handleRemoveAttributeClick={this.handleRemoveAttributeClick}
                handleAddAttributeClick={this.handleAddAttributeClick}
                handleDeleteCategory={this.handleDeleteCategory}
                handleClick={this.handleClick}
                open={open}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addAttribute: (categoryId, attribute) => dispatch(addAttribute(categoryId, attribute))
})

export default connect(() => ({}), mapDispatchToProps)(Category);
