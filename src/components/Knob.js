import React, {useReducer, useEffect, useRef, useCallback} from 'react'
import classNames from 'classnames'
import {reducer, initialState, actionNames} from '../helpers/rotationState'

const Knob = ({onChange, className}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const ref = useRef()
    const onMouseDown = useCallback(e => {
        e.preventDefault()
        dispatch({type: actionNames.DRAG_START, x: e.clientX, y: e.clientY})
    }, [])

    const onMouseMove = useCallback(e => {
        if (state.isDragging) {
            e.preventDefault()
            dispatch({type: actionNames.DRAG_MOVE, x: e.clientX, y: e.clientY})
        }
    }, [state.isDragging])

    const onMouseUp = useCallback(e => {
        if (state.isDragging) {
            e.preventDefault()
            dispatch({type: actionNames.DRAG_END})
        }
    }, [state.isDragging])

    useEffect(() => {
        const {top, left, height, width} = ref.current.getBoundingClientRect()
        const center = {
            x: left + (width / 2),
            y: top + (height / 2)
        }
        dispatch({
            type: actionNames.INITIAL_MEASURE,
            center
        })
    }, [])

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove, true)
        document.addEventListener('mouseup', onMouseUp, true)

        return () => {
            document.removeEventListener('mousemove', onMouseMove, true)
            document.removeEventListener('mouseup', onMouseUp, true)
        }
    },[onMouseMove, onMouseUp])

    return <div
        className={classNames('Knob', className)} 
        ref={ref}
        onMouseDownCapture={onMouseDown}
    >
        <div 
            className="Knob__outer" 
            style={{transform: `rotate(${state.angle + state.rotation}rad)`}}
        ></div>
        <div className="Knob__inner"></div>
    </div>
}

Knob.AXIS = {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL'
}

export default Knob