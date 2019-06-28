

export const actionNames = {
    INITIAL_MEASURE: 'INITIAL_MEASURE',
    DRAG_START: 'DRAG_START',
    DRAG_MOVE: 'DRAG_MOVE',
    DRAG_END: 'DRAG_END'
}

export const initialState = {
    startAngle: 0,
    rotation: 0,
    angle: 0,
    isDragging: false
}

export const reducer = (state, {type, ...action} = {}) => {
    switch(type) {
        case actionNames.INITIAL_MEASURE:
            return {
                ...state,
                ...action
            }
        case actionNames.DRAG_START: {
            const dx = action.x - state.center.x
            const dy = action.y - state.center.y
            return {
                ...state,
                startAngle: Math.atan2(dy, dx),
                isDragging: true
            }
        }
        case actionNames.DRAG_MOVE: {
            const dx = action.x - state.center.x
            const dy = action.y - state.center.y
            const angle = Math.atan2(dy, dx)
            return {
                ...state,
                rotation: angle - state.startAngle
            }
        }
        case actionNames.DRAG_END: {
            return {
                ...state,
                angle: state.angle + state.rotation,
                isDragging: false
            }
        }
        default:
            return state
    }
}