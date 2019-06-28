import {ACTION_NAMES} from './consts'

export const initialState = {
    dirs: []
}

export const reducer = (state, action) => {
    switch(action.type) {
        case ACTION_NAMES.ADD_DIRECTION: 
            return {
                ...state,
                dirs: [...new Set([...state.dirs, action.dir])]
            }
        case ACTION_NAMES.REMOVE_DIRECTION:
            return {
                ...state,
                dirs: state.dirs.filter(dir => dir !== action.dir)
            }
        default:
            return state
    }
}