import React from 'react';
import {connect} from 'react-redux';

import EditCategoryView from "./editCategoryView";
import {getCategory} from "../../reducers";
import {addCategory, editCategory, fetchCategories} from "../../actions";

class EditCategory extends React.Component {

    state = {id: 0, name: "", multipleChoice: false};

    componentWillMount() {
        const {id} = this.props.match.params;
        if (id) {
            this.props.fetchCategories();
        }
    }

    componentWillReceiveProps({category}) {
        if (category) {
            this.setState({...category});
        }
    }
    saveCategory = () => {
        const {editCategory, addCategory, match, history} = this.props;
        const {id} = match.params;
        const {push} = history;
        if (id) {
            editCategory(this.state);
        } else {
            addCategory(this.state);
        }
        push('/categories');
    }

    onNameChange = event => this.setState({name: event.target.value});

    onMultipleChoiceChange = event => this.setState({multipleChoice: event.target.checked});

    submitForm = event => {
        event.preventDefault();
        this.saveCategory();
    }


    render() {
        const {name, multipleChoice} = this.state;
        return (
            <EditCategoryView
                name={name}
                onNameChange={this.onNameChange}
                multipleChoice={multipleChoice}
                onMultipleChoiceChange={this.onMultipleChoiceChange}
                submitForm={this.submitForm}
            />
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    if (id) {
        return {category: getCategory(state, id)};
    } else {
        return {};
    }
}

const mapDispatchToProps = dipsatch => ({
    fetchCategories: () => dipsatch(fetchCategories()),
    editCategory: category => dipsatch(editCategory(category)),
    addCategory: category => dipsatch(addCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
