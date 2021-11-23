import React from 'react';
import PropTypes from 'prop-types';

import '../styles/customButton.scss';

const CustomButton = ({ children, isSigningIn, isSigningUp, disabled }) => {
 
  return (
    <button
      type='submit'
      className={`${
        isSigningIn || isSigningUp ? 'is-signing-in custom-button' : 'custom-button'
      }`}
      disabled={disabled}
    >
      {children}
    </button>
)};

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  isSigningIn: PropTypes.bool,
  isSigningUp: PropTypes.bool,
  disabled: PropTypes.bool
};

export default CustomButton;


