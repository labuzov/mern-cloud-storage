import authApi from "../../api/authApi";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const USER_LOGOUT   = 'auth/USER_LOGOUT';


const defaultState = {
    user: {
        id: null,
        email: null,
        diskSpace: null,
        usedSpace: null,
    },
    isAuth: false
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                isAuth: action.isAuth,
                user: {...action.user}
            }
        }

        case USER_LOGOUT: {
            return {
                ...state,
                user: {
                    id: null,
                    email: null,
                    diskSpace: null,
                    usedSpace: null,
                },
                isAuth: false
            }
        }

        default: {
            return state
        }
    }
}


export const setUserData = (isAuth, token, id, email, diskSpace, usedSpace) => ({
    type: SET_USER_DATA,
    isAuth,
    token,
    user: {
        id,
        email,
        diskSpace,
        usedSpace
    }
})

export const userLogout = () => ({
    type: USER_LOGOUT
})


const setUserFromResponse = (response, dispatch) => {
    if (response.status === 200) {
        const data = response.data;

        const token = data.token;
        const {id, email, diskSpace, usedSpace} = data.user;
        
        localStorage.setItem('token', token)

        dispatch(setUserData(true, token, id, email, diskSpace, usedSpace))
    }
}

export const authByToken = () => async (dispatch) => {
    try {
        const response = await authApi.auth();
        
        setUserFromResponse(response, dispatch)
    } catch(e) {
        localStorage.removeItem('token');
    }
}

export const getUserData = (email, password) => async (dispatch) => {
    try {
        const response = await authApi.login(email, password);
        
        setUserFromResponse(response, dispatch)
    } catch(e) {
        alert(e.response.data.message);
    }
}

export const createNewUser = (email, password) => async (dispatch) => {
    try {
        const response = await authApi.register(email, password);

        setUserFromResponse(response, dispatch)
    } catch(e) {
        alert(e.response.data.message);
    }
}

export default userReducer