import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { insertCategory, updateCategory, getCategory } from '../api';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
});

class EditCategory extends React.Component {

  state = { id: 0, name:"" };
  componentDidMount() {
    const {id} = this.props.match.params;
    if (id) {
      getCategory(id)(category => this.setState({...category}));
    }
  }

  onNameChange = event => this.setState({ name: event.target.value });
  submitForm = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    const {push} = this.props.history;
    return id
      ? updateCategory({ ...this.state })(() => push(`/categories/${id}`))
      : insertCategory({name:this.state.name})(stock => push(`/categories/${stock.id}`));
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <Paper className={classes.root} elevation={4}>
            <TextField
              label="Category name"
              placeholder="Start typing"
              className={classes.textField}
              margin="normal"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            <Button type="submit">Save</Button>
          </Paper>
        </div>
      </form>
    )
  }
};

export default withStyles(styles)(EditCategory);