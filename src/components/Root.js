import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/todo/" component={App}>
        <Route path=":filter" component={App}/>
      </Route>
    </Router>
  </Provider>
);

export default Root;
