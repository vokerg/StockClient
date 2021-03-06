import React from 'react';
import { connect } from 'react-redux';

import { getProduct, getProductRests, getProductPictures } from '../../api';
import ProductView from './productView';
import { getCurrentUser } from '../../reducers';
import ProductTabs from './productTabs';
import ProductTreeView from './productTreeView';
import CategoryAttributeView from './categoryAttributeView';

class Product extends React.Component {
  state = {
    id: 0,
    name: "",
    productRests: [],
    productPictureIds: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    getProduct(id)(product => {
      this.setState({ ...product })
      getProductRests(id)(productRests => this.setState({ productRests }));
      getProductPictures(id)(productPictureIds => this.setState({ productPictureIds }));
    });
  }

  render() {
    const {id} = this.props.match.params;
    const {user} = this.props;
    const isAllowedProductEdit = user !== null ? user.isAllowedProductEdit : false;
    return (
      <div>
        <ProductView
          id={id}
          name={this.state.name}
          isAllowedProductEdit={isAllowedProductEdit}
          productPictureIds={this.state.productPictureIds}
        >
            <ProductTreeView/>
            <CategoryAttributeView/>
        </ProductView>
        <ProductTabs id={id} productRests={this.state.productRests}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: getCurrentUser(state) });

export default connect(mapStateToProps, () => ({}))(Product);
