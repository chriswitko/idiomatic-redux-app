import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import * as actions from '../actions';
import { getIfUserIsLoggedIn } from '../reducers';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const { myLoggedIn, addTodo } = this.props;

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          console.log('value', this.state.value)
          if (!this.state.value.trim()) {
            return;
          }
          addTodo(this.state.value);
          console.log('this.state', this.state)
          this.setState({value: ''});
        }}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button type="submit" disabled={!myLoggedIn}>
            Add Todo
          </button>
        </form>
      </div>
    );
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (txt) => dispatch(actions.addTodo(txt)),
  };
};

const mapStateToProps = (state) => {
  return {
    myLoggedIn: getIfUserIsLoggedIn(state)
  };
};

AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
