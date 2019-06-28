import React, {useReducer, useEffect, useCallback} from 'react'
import Knob from './Knob'
import Board from './Board'
import StatusRow from './StatusRow'
import {ACTION_NAMES} from '../consts'
import {initialState, reducer} from '../stateManagement'


const getDirection = code => {
    const match = code.match(/^Arrow(Left|Up|Right|Down)$/)
    return match && match[1]
}

const EtchASketch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addDirection = dir => dispatch({type: ACTION_NAMES.ADD_DIRECTION, dir})
    const removeDirection = dir => dispatch({type: ACTION_NAMES.REMOVE_DIRECTION, dir})
    
    const onKeyDown = useCallback(e => {
        const dir = getDirection(e.code)
        if (dir) {
            e.preventDefault()
            dispatch({type: ACTION_NAMES.ADD_DIRECTION, dir})
        }
    }, [dispatch])

    const onKeyUp = useCallback(e => {
        const dir = getDirection(e.code)  
        if (dir) {
            e.preventDefault()
            dispatch({type: ACTION_NAMES.REMOVE_DIRECTION, dir})
        }
    }, [dispatch])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, true)
        document.addEventListener('keyup', onKeyUp)
        return () => {
            document.removeEventListener('keydown', onKeyDown, true)
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    const boardRef = React.createRef();
    const onShakeClicked = () => {boardRef.current.shake()}
    return (
    <div className="EtchASketch">
        <div className="EtchASketch__device">
            <Board 
                ref={boardRef} 
                dirs={state.dirs}
                className="EtchASketch__board"
            />
            <Knob
                className="EtchASketch__knob-horizontal" 
                axis={Knob.AXIS.HORIZONTAL} 
                onMoveStart={addDirection} 
                onMoveEnd={removeDirection}
            />
            <div className="EtchASketch__panel">
                <button className="EtchASketch__shake" onClick={onShakeClicked}>Shake!</button>
            </div>
            <Knob 
                className="EtchASketch__knob-vertical" 
                axis={Knob.AXIS.VERTICAL} 
                onMoveStart={addDirection} 
                onMoveEnd={removeDirection}
            />
        </div>
        <StatusRow dirs={state.dirs}/>
    </div>
    )
}

export default EtchASketch