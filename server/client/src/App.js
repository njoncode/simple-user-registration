import React from 'react';
// import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch, Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import history from './utils/history';

import { selectCurrentUser } from './redux/user/userSelectors';

import SignInAndSignUp from './components/SignInAndSignUp';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ProtectedRoute from './router/ProtectedRoute';
import ProtectedPage from './components/ProtectedPage';
import NotFoundPage from './components/NotFoundPage';

const App = ({ currentUser }) => {

  return (
    <div className="app">
      <Header />
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Homepage}/> 
            <Route exact path='/sign-in' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp/> )} />
            <ProtectedRoute path='/protected-route' component={ProtectedPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
    </div>
  );
};

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(App);

