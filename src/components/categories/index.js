import React from 'react';
import {connect} from 'react-redux';

import CategoriesView from './categoriesView';

import {fetchCategories} from '../../actions';
import {getCategories} from "../../reducers";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class Categories extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const {history, categories} = this.props;
        return (
            <CategoriesView newCategory={() => history.push("/createcategory")} categories={categories}/>
        )
    }
}

const mapStateToProps = state => ({
    categories: getCategories(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
