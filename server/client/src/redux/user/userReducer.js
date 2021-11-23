import userConstants from "./userConstants";

const INTITIAL_STATE = {
    currentUser: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    failureMessage: '',
    isSigningIn: false,
    isSigningUp: false
};

const userReducer = (state = INTITIAL_STATE, action) => {
    console.log('userReducer state: ', state);
    switch(action.type) {
        case userConstants.SIGN_UP_START:
            return { 
                ...state,
                error: null,
                isLoading: true,
                isSigningUp: true
            };
        case userConstants.SIGN_UP_SUCCESS:
            return { 
                ...state,
                currentUser: action.payload,
                error: null,
                isLoading: false,
                isSuccess: true,
                isSigningUp: false
            };
        case userConstants.SIGN_UP_FAILURE:
        case userConstants.SIGN_IN_FAILURE:
        case userConstants.SIGN_OUT_FAILURE:
            return { 
                ...state,
                error: action.payload,
                isLoading: false,
                failureMessage: action.payload,
                isSigningUp: false,
                isSigningIn: false
            };
        case userConstants.SIGN_IN_START:
            return { 
                ...state,
                error: null,
                isLoading: true,
                isSigningIn: true
            };
        case userConstants.SIGN_IN_SUCCESS:
        return { 
            ...state,
            currentUser: action.payload,
            error: null,
            isLoading: false,
            isSuccess: true,
            isSigningIn: false
        };
        case userConstants.SIGN_OUT_SUCCESS:
            return { 
                ...state,
                currentUser: null,
                error: null,
                isLoading: false,
                isSuccess: true,
                isSigningIn: false
            };
        case userConstants.CLEAR_SUCCESS_FAILURE:
            return { 
                ...state,
                isSuccess: false,
                failureMessage: ''
            };
            
        default:
            return state;
    }
};

export default userReducer;