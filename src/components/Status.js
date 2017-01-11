import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class Status extends Component {
  render() {
    const { todos} = this.props;

    return (
      <div>
        <p>
          Total:
          {" "}
          {todos.length || 0}
        </p>      
      </div>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

Status = withRouter(connect(
  mapStateToProps,
  actions
)(Status));

export default Status;
