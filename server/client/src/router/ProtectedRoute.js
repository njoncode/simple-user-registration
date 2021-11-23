import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../redux/user/userSelectors';

const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => {
 
  return (
    <Route {...rest} render={ (props) => {
        if (currentUser) {
          return <Component {...rest} {...props} />;
        }
        return <Redirect to="/sign-in" />;
      }}
    /> 
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
  });

export default connect(mapStatetoProps)(ProtectedRoute);