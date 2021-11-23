import { takeLatest, put, all, call, select, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import userConstants from './userConstants';
import  { signUpSuccessAction, signUpFailureAction, signInSuccessAction, signInFailureAction, signOutSuccessAction, signOutFailureAction, editUserSuccessAction, editUserFailureAction, editUserPasswordSuccessAction, editUserPasswordFailureAction, clearSuccessFailureAction } from './userActions';
// import { selectUsersData } from './userSelectors';
import {signUpApi, signInApi, signOutApi} from '../../utils/api';
import {setToken, getToken} from '../../utils/helperFunctions';

export function* signUp({ payload }) {
    try {
        // console.log('signUp payload: ', payload);
        const signUpCredentials = payload;
        yield delay(3000);
        const signUpResponse = yield call(signUpApi, signUpCredentials);
        console.log('signUp signUpResponse: ', signUpResponse);
        if(signUpResponse.status === 200) {
            yield put(signUpSuccessAction(signUpResponse.data.user));
            yield put(clearSuccessFailureAction());
            // Report success to our store and redirect to another page
            yield put(push('/'));     
        } else {
            yield put(signUpFailureAction(signUpResponse.data.message));
            yield put(clearSuccessFailureAction());
        }
    } catch (error) {
        console.log('Error Caught: signUp: ', error)
        yield put(signUpFailureAction(error));
        yield put(clearSuccessFailureAction());
    }
};

export function* signIn({ payload }) {
    try {
        // console.log('signIn payload: ', payload);
        const signInCredentials = payload;
        yield delay(3000);
        const signInResponse = yield call(signInApi, signInCredentials);
        const {status, statusText, data: {data}} = signInResponse;
        console.log('signIn res: ', signInResponse);
        if(status === 200 || statusText === "OK") {
            console.log('signInResponse.data.token: ', data.token.jwtToken);
            // sessionStorage.setItem('token', data.token.jwtToken);
            // sessionStorage.setItem('user', data.user.email);
            setToken(data.token.jwtToken);
             // Report success to our store
            yield put(signInSuccessAction(data.user.email));
            yield put(clearSuccessFailureAction());
            // Redirect to homepage
            yield put(push('/'));     
        } else {
                // yield put(signInFailureAction('Failed! Invalid email or password'));
                yield put(signInFailureAction(data.message));
                yield put(clearSuccessFailureAction());
            }
    } catch (error) {
        console.log('Error Caught: signIn: ', error);
        yield put(signInFailureAction(error));
        yield put(clearSuccessFailureAction());
    }
};

export function* signOut() {
    try {
        // const tokenSignOut = sessionStorage.getItem('token');
        const tokenSignOut = getToken();
        console.log('tokenSignOut: ', tokenSignOut);
        const signOutResponse = yield call(signOutApi, tokenSignOut);
        console.log('signOutResponse: ', signOutResponse);
        if (signOutResponse.status === 200 || signOutResponse.statusText === "OK") {
            yield put(signOutSuccessAction());
            yield put(clearSuccessFailureAction());
        } else {
            yield put(signOutFailureAction('Some error encountered while signing out.'));
            yield put(clearSuccessFailureAction());
        }
        
    } catch (error) {
        yield put(signOutFailureAction(error));
        yield put(clearSuccessFailureAction());
    }
};


export function* onSignUpStart() {
    yield takeLatest(userConstants.SIGN_UP_START, signUp);
};

export function* onSignInStart() {
    yield takeLatest(userConstants.SIGN_IN_START, signIn);
};

export function* onSignOutStart() {
    yield takeLatest(userConstants.SIGN_OUT_START, signOut);
};


export function* userSagas() {
    yield all([
        call(onSignUpStart), 
        call(onSignInStart), 
        call(onSignOutStart),
    ]);
};

