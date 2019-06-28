import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const DIRECTIONS = {
    Left: 2**0,
    Up: 2**1,
    Right: 2**2,
    Down: 2**3
}

const VELOCITY_BY_DIRS = [
    [0, 0], //  0000: None
    [-1, 0], // 0001: Left
    [0, -1], // 0010: Up
    [-1, -1], //0011: Left+Up
    [1, 0], //  0100: Right
    [0, 0], //  0101: Left+Right
    [1, -1], // 0110: Up+Right
    [0, -1], // 0111: Left+Up+Right
    [0, 1], //  1000: Down
    [-1, 1], // 1001: Left+Down
    [0, 0], //  1010: Up+Down
    [-1, 0], // 1011: Left+Up+Down
    [1, 1], //  1100: Right+Down
    [0, 1], //  1101: Left+Right+Down
    [1, 0], //  1110: Up+Right+Down
    [0, 0] //   1111: Left+Up+Right+Down
]

const getVelocity = dirs => VELOCITY_BY_DIRS[dirs.reduce((acc, dir) => acc + DIRECTIONS[dir], 0)]
const AddVectors = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]

class Board extends React.Component {
    constructor(props) {
        super(props)
        this._canvasRef = React.createRef()
        this.state = {
            isShaking: false,
            coords: [0, 0]
        }
    }

    componentDidMount() {
        this._ctx = this._canvasRef.current.getContext('2d')
        const draw = () => {
            this._ctx.beginPath();
            this._ctx.moveTo(...this.state.coords)
            const v = getVelocity(this.props.dirs)
            const coords = AddVectors(this.state.coords, v)
            this.setState({coords})
            this._ctx.lineTo(...coords)
            this._ctx.closePath()
            this._ctx.stroke()
            this._requestId = requestAnimationFrame(draw)
        }
        this._requestId = requestAnimationFrame(draw)
    }

    componentWillUnmount() {
        cancelAnimationFrame(this._requestId)
    }

    shake(iterations) {
        this._ctx.save()
        this._ctx.fillStyle = 'rgba(169, 169, 169, 0.1)'
        this.setState({
            isShaking: true
        })
        const {width, height} = this._canvasRef.current
        let currIteration = 0
        const animate = () => {
            currIteration++;
            this._ctx.fillRect(0, 0, width, height)
            if (currIteration < iterations) {
                requestAnimationFrame(animate)
            } else {
                this._ctx.restore()
                this._ctx.clearRect(0, 0, width, height)
                this.setState({
                    isShaking: false
                })
            }
        }
        requestAnimationFrame(animate)
    }

    render() {
        return <canvas 
            className={classnames('Board', this.props.className)}
            ref={this._canvasRef} 
            >
        </canvas>
    }
}

Board.propTypes = {
    dirs: PropTypes.arrayOf(PropTypes.oneOf(['Left', 'Up', 'Right', 'Down']))
}

Board.defaultProps = {
    dirs: []
}

export default Board