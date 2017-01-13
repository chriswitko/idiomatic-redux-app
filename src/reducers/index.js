import { combineReducers } from 'redux';
import byId, * as fromById  from './byId';
import createList, * as fromList from './createList';
import createUser, * as fromUser from './createUser';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const user = combineReducers({
  current: createUser()
})

const todos = combineReducers({
  byId,
  listByFilter,
  user,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);

export const getCurrentUser = (state) => {
  return fromUser.getCurrentUser(state)
  // return fromUser.state.
}
  
