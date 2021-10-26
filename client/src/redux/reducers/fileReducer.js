import fileApi from "../../api/fileApi";

const SET_CURRENT_DIR   = 'file/SET_CURRENT_DIR';
const SET_FILES         = 'file/SET_FILES';
const ADD_FILE          = 'file/ADD_FILE';
const SET_POPUP_DISPLAY = 'file/SET_POPUP_DISPLAY';
const SET_DIR_STACK     = 'file/SET_DIR_STACK';
const PUSH_TO_STACK     = 'file/PUSH_TO_STACK';


const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    dirStack: []
}


const fileReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_FILES: return {...state, files: action.files}   

        case SET_CURRENT_DIR: return {...state, currentDir: action.currentDir}

        case ADD_FILE: return {...state, files: [...state.files, action.file]}  

        case SET_POPUP_DISPLAY: return {...state, popupDisplay: action.popupDisplay} 

        case SET_DIR_STACK: return {...state, dirStack: action.dirStack}
        
        case PUSH_TO_STACK: return {...state, dirStack: [...state.dirStack, action.dir]}

        default: {
            return state
        }
    }
}


export const setFiles = (files) => ({
    type: SET_FILES,
    files
})

export const setCurrentDir = (currentDir) => ({
    type: SET_CURRENT_DIR,
    currentDir
})

export const addFile = (file) => ({
    type: ADD_FILE,
    file
})

export const setPopupDisplay = (popupDisplay) => ({
    type: SET_POPUP_DISPLAY,
    popupDisplay
})

export const setDirStack = (dirStack) => ({
    type: SET_DIR_STACK,
    dirStack
})

export const pushToStack = (dir) => ({
    type: PUSH_TO_STACK,
    dir
})


//---------------------------------

export const getFiles = (dirId) => async (dispatch) => {
    try {
        const response = await fileApi.getFiles(dirId);
        
        const files = response.data
        
        dispatch(setFiles(files));
    } catch (e) {
        alert(e);
    }
}

export const createDir = (dirId, name) => async (dispatch) => {
    try {
        const response = await fileApi.createDir(dirId, name);
        
        const file = response.data
        
        dispatch(addFile(file));
    } catch (e) {
        alert(e.response.data.message);
    }
}


export default fileReducer

