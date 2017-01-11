import { combineReducers } from 'redux';

const createUser = () => {

  const isLoggedIn = (state = false, action) => {
    console.log('isLoggedIn:action', action, state)
    switch (action.type) {
      case 'FETCH_USER_REQUEST':
        console.log('A1')
        return true;
      case 'FETCH_USER_SUCCESS':
        console.log('A2')
        return true;
      case 'FETCH_USER_FAILURE':
        console.log('A3')
        return false;
      default:
        console.log('A4')
        return state;
    }
  };

  return combineReducers({
    isLoggedIn,
  });
};

export default createUser;

export const getIsLoggedIn = (state) => {
  console.log('getIsLoggedIn state', state)
  return state
};

