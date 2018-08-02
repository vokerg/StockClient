import React from 'react';
import { connect } from 'react-redux';

import { getStocks, getOperationTypes, insertDoc, validateDoc } from '../../api';
import { saveDraftDocument, clearDraft, fetchProducts } from '../../actions';
import { getDraft } from '../../reducers';
import EditDocumentView from './editDocumentView';
import EditOrdersView from './editOrdersView';
import EditButtons from './editButtons';
import SaveDraftDialog from './saveDraftDialog'

class EditDocument extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOperationType:0,
      selectedStock:"0",
      selectedStock2:"0",
      operationTypes:[],
      transfer: false,
      orders:[this.getNewOrderLine()],
      stocks:[],
      draftDialogOpen:false,
      draftName:"",
      draftId:null
    };
  }

  componentDidMount() {
    getStocks(stocks => this.setState({ stocks }));
    this.props.fetchProducts();
    getOperationTypes(operationTypes => this.setState({operationTypes}));
    const {draft} = this.props;
    if (draft) {
      this.setState({...draft});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.draftId !== this.props.match.params.draftId) {
      const {draft} = nextProps;
      if (draft) {
        this.setState({...draft});
      }
    }
  }

  getNewOrderLine = () => ({ idProduct: "0", qty:"0" })

  addNewOrderLine = () => this.setState({
    orders: [...this.state.orders, this.getNewOrderLine()]
  })

  operationTypeChange = ({target: input}) => {
    this.setState({selectedOperationType: input.value})
    this.state.operationTypes
      .filter(({id}) => id === input.value)
      .forEach(({fTransfer: transfer}) => this.setState({ transfer }));
  }

  orderLineChange = orderColumnName => key => orderColumnValue => this.setState({
    orders: this.state.orders.map(
      (order, arrayKey) => (arrayKey === key) ? {...order, [orderColumnName]:orderColumnValue} : order
    )
  });

  orderLineInputChange = key => ({target: input}) => this.orderLineChange(input.name)(key)(input.value);

  stockChange = ({target: input}) => this.setState({ [input.name]: input.value });

  submitDocument = event => {
    event.preventDefault();
    const {orders, selectedStock, selectedStock2, selectedOperationType, transfer} = this.state;

    let document = {
      stockId: selectedStock,
      operationTypeId: selectedOperationType,
      stockId2: (transfer) ? selectedStock2 : null,
      orders: orders.map(order => ({
        stockId: selectedStock,
        operationTypeId: selectedOperationType,
        stockId2: (transfer) ? selectedStock2 : null,
        productId: order.idProduct,
        qty: order.qty
      }))
    };
    validateDoc(document)((value) => {
      insertDoc(document)(() => console.log("order added!"));
    })
  }

  saveDraftDocument = () => {
    const payload = (({transfer, selectedStock, selectedStock2, selectedOperationType, orders, draftName, draftId}) =>
      ({transfer, selectedStock, selectedStock2, selectedOperationType, orders, draftName, draftId}))(this.state);
    this.props.saveDraftDocument(payload);
    this.setState({draftDialogOpen:false});
    this.props.history.push('/');
  }

  saveDraftDocumentClick = event => {
    event.preventDefault();
    return (!this.state.draftId)
      ? this.setState({draftDialogOpen:true})
      : this.saveDraftDocument();
  }

  handleDialogOk = () => this.saveDraftDocument();

  setDraftName = event => this.setState({draftName:event.target.value})

  clearDraftDocument = event => {
    event.preventDefault();
    const {clearDraft, match, history} = this.props;
    clearDraft(match.params.draftId);
    history.push('/');
  }

  render() {
    return (
      <div>
        <EditDocumentView
          selectedOperationType = {this.state.selectedOperationType}
          operationTypes = {this.state.operationTypes}
          selectedStock = {this.state.selectedStock}
          selectedStock2 = {this.state.selectedStock2}
          stocks={this.state.stocks}
          transfer = {this.state.transfer}
          submitDocument = {this.submitDocument}
          operationTypeChange = {this.operationTypeChange}
          stockChange = {this.stockChange}
        >
          <EditOrdersView
            orders = {this.state.orders}
            addNewOrderLine = {this.addNewOrderLine}
            orderLineInputChange = {this.orderLineInputChange}
            productChange = {this.orderLineChange("idProduct")}
          />
          <EditButtons
            saveDraftDocument = {this.saveDraftDocumentClick}
            clearDraftDocument = {this.clearDraftDocument}
            draft = {this.props.draft}
          />
        </EditDocumentView>
        <SaveDraftDialog
          dlgOpen={this.state.draftDialogOpen}
          handleClose={() => this.setState({draftDialogOpen:false})}
          handleCancel={() => this.setState({draftDialogOpen:false})}
          handleOk={this.handleDialogOk}
          setDraftName={this.setDraftName}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  draft: getDraft(state, match.params.draftId)
});

const mapDispatchToProps = dispatch => ({
  saveDraftDocument: payload => dispatch(saveDraftDocument(payload)),
  clearDraft: draftId => dispatch(clearDraft(draftId)),
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);
