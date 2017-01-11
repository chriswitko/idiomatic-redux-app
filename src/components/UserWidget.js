import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getIfUserIsLoggedIn } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';
import { loginUser, authorizeUser } from '../actions';

let createHandlers = function(dispatch) {
  let onClick = function() {
    dispatch(loginUser())
  };

  return {
    onClick,
    // other handlers
  };
}


class UserWidget extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.dispatch', this.props.dispatch)
    // this.handlers = createHandlers(this.props.dispatch);
    // this.myClick = loginUser()
  }

  fetchData() {
    const { filter, isLoggedIn } = this.props;
    authorizeUser()
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.fetchData()
    // this.fetchData();
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', prevProps)
    this.fetchData()
    // if (this.props.filter !== prevProps.filter) {
    //   this.fetchData();
    // }
    // const { isLoggedInUser } = this.props;
    // isLoggedInUser = this.props.isLoggedIn
  }
  // login({ dispatch }) {
  //   loginUser()
  //   // dispatch(loginUser());
  //   // const { filter, fetchTodos } = this.props;
  //   console.log('UserWidget:this.props', this)
  // }

  render() {
    const { myClick, myLogoutClick, myLoggedIn } = this.props;

    return (
      <div>
        <p>
          {"("}
          {myLoggedIn}
          {")"}
          {myLoggedIn ? "Logged In" : "Not logged In"}
          {" "}
          <button
          type="button"
          onClick={myLoggedIn ? myLogoutClick : myClick}
          >{myLoggedIn ? "Log Out" : "Log In"}</button>
        </p>      
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myClick: () => dispatch(actions.loginUser()),
    myLogoutClick: () => dispatch(actions.logoutUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    myLoggedIn: getIfUserIsLoggedIn(state)
  };
};

UserWidget = connect(
  mapStateToProps,
  // actions
  mapDispatchToProps
)(UserWidget);

export default UserWidget;

// import React from 'react';
// import { connect } from 'react-redux';
// import { loginUser } from '../actions';

// let UserWidget = ({ dispatch }) => {
//   let input;

//   return (
//     <div>
//       <p>
//         Not logged In
//         {" "}
//         <button
//         type="button"
//         onClick={e => {
//           e.preventDefault();
//           dispatch(loginUser())
//         }}
//         >LogIn</button>
//       </p>      
//     </div>
//   );
// };
// UserWidget = connect()(UserWidget);

// export default UserWidget;
