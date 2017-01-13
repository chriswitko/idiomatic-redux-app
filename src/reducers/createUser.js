import { combineReducers } from 'redux';

const createUser = () => {

  const isLoggedIn = (state = false, action) => {
    switch (action.type) {
      case 'FETCH_USER_REQUEST':
        return true;
      case 'FETCH_USER_SUCCESS':
        return true;
      case 'FETCH_USER_LOGOUT':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    isLoggedIn,
  });
};

export default createUser;

export const getCurrentUser = (state) => {
  console.log('YYY:state', state)
  if ( state ) {
    return state.user.current
  }
  return state
};

