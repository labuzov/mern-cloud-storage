import { authByToken } from "./userReducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';

const defaultState = {
    initialized: false,
}


const appReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_INITIALIZED: return {...state, initialized: true}
        
        default: {
            return state
        }
    }
}


export const setSuccessInitialized = () => ({
    type: SET_INITIALIZED
})


// ---------------------------------

export const initializeApp = () => (dispatch) => {
    const authPromise = dispatch(authByToken());

    Promise.all([authPromise]).then(() => {
        dispatch(setSuccessInitialized());
    })
}

export default appReducer

