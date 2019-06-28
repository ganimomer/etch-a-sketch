import React from 'react'

const GLYPH_BY_DIR = {
    Left: '←',
    Up: '↑',
    Right: '→',
    Down: '↓'
}

const StatusRow = ({dirs}) => {
    return <div className="StatusRow">{
        dirs
            .map(dir => GLYPH_BY_DIR[dir])
            .join()
        }</div>
}

export default StatusRow