import React from 'react';
import {connect} from 'react-redux';

import {insertCategory, updateCategory} from '../../api/index';
import EditCategoryView from "./editCategoryView";
import {getCategory} from "../../reducers";
import {fetchCategories} from "../../actions";

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

    onNameChange = event => this.setState({name: event.target.value});
    onMultipleChoiceChange = event => this.setState({multipleChoice: event.target.checked});
    submitForm = event => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {push} = this.props.history;
        const {name, multipleChoice} = this.state;
        return id
            ? updateCategory({...this.state})(() => push(`/categories/${id}`))
            : insertCategory({name, multipleChoice})(stock => push(`/categories/${stock.id}`));
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
    fetchCategories: () => dipsatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
