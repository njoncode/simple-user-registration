import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useToasts } from 'react-toast-notifications';

import '../styles/signUp.scss';

import { signUpStartAction } from '../redux/user/userActions';
import { selectIsLoading, selectIsSuccess, selectFailureMessage, selectIsSigningUp } from '../redux/user/userSelectors';

import FormInput from './FormInput';
import CustomButton from './CustomButton';
import Loader from './Loader';

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    

const SignUp = ({ signUpStartDispatch, isLoading, isSuccess, isSigningUp }) => {

    const [userCredentials, setCredentials] = useState({ 
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = userCredentials;
        

    const handleOnChange = e => {
       const { name, value } = e.target;
       setCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault() ;

        const checkEmail = validateEmail(email);
        
        if(!checkEmail) {
            alert('Invalid Email Address!');
            return;
        }

        if(password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        };

        signUpStartDispatch({ name, email, password, confirmPassword });
    };

    return (
        <div className='sign-up'>
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput 
            type='text'
            name='name'
            value={name}
            onChange={handleOnChange}
            label='Display Name'
            required
        />
        <FormInput 
            type='text'
            name='email'
            value={email}
            onChange={handleOnChange}
            label='Email'
            required
        />
        <FormInput 
            type='password'
            name='password'
            value={password}
            onChange={handleOnChange}
            label='Password'
            required
        />
        <FormInput 
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange}
            label='Confirm Password'
            required
        />
        <CustomButton type='submit' isSigningUp={isSigningUp}>
            {isSigningUp  ? <Loader text='Signing Up'/> : 'Sign up'}
        </CustomButton>
        </form>
        </div>
    )
};


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading,
    isSuccess: selectIsSuccess,
    failureMessage: selectFailureMessage,
    isSigningUp: selectIsSigningUp
  });

const mapDispatchToProps = dispatch => ({
    signUpStartDispatch: userCredentials => dispatch(signUpStartAction(userCredentials)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);