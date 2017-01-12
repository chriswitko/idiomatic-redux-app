import React from 'react';
import Footer from './Footer';
import Status from './Status';
import UserWidget from './UserWidget';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Nav from './Nav';

const App = () => (
  <div>
    <Nav />
    <UserWidget />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Status />
  </div>
);

export default App;
