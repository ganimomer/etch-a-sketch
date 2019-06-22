const controls = document.getElementById('controls')
const canvas = document.getElementById('board')
const statusRow = document.getElementById('status-row')
const shake = document.getElementById('shake')
const context = canvas.getContext('2d')
const currentDirs = new Set()
const X = 0
const Y = 1
const dirs = {
    ArrowLeft: {glyph: '←', m: -1, axis: X},
    ArrowUp: {glyph: '↑', m: -1, axis: Y},
    ArrowRight: {glyph: '→', m: 1, axis: X},
    ArrowDown: {glyph: '↓', m: 1, axis: Y}
}
const MAX_SPEED = 10
const showDownKeys = () => statusRow.innerText = [...currentDirs].map(k => dirs[k].glyph)
const coords = [0, 0]
let w, h
let isShaking

const updateDims = () => {
    w = document.body.clientWidth
    h = document.body.clientHeight
}

const clamp = (min, val, max) => Math.max(min, Math.min(val, max))
updateDims()
context.save()

const animateShakeClear = () => {
    const duration = 16
    const iterations = 50
    let currIteration = 0
    context.save()
    context.fillStyle = 'rgba(169, 169, 169, 0.1)'
    isShaking = true
    const timerId = setInterval(() => {
        currIteration++
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        if (currIteration % 2) {
            document.body.style.transform = 'translateY(-5px)'
        } else {
            document.body.style.transform = ''
        }
        if (currIteration === iterations) {
            clearInterval(timerId)
            context.restore()
            context.restore()
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            isShaking = false
        }
    }, duration)
}

const onShake = () => {
    animateShakeClear()
}

shake.addEventListener('click', onShake)

document.addEventListener('keydown', e => {
    const dirInfo = dirs[e.code]
    if (!isShaking && dirInfo) {
        e.preventDefault()
        currentDirs.add(e.code)
        showDownKeys()
    }
}, {useCapture: true})

document.addEventListener('keyup', e => {
    const dirInfo = dirs[e.code]
    if (!isShaking && dirInfo) {
        e.preventDefault()
        currentDirs.delete(e.code)
        showDownKeys()
    }
}, {useCapture: true})

document.addEventListener('resize', updateDims)

const updateCoords = v => {
    coords[X] = clamp(0, coords[X] + v[X], w)
    coords[Y] = clamp(0, coords[Y] + v[Y], h)
}

setInterval(() => {
    context.beginPath()
    context.moveTo(...coords)
    const v = [...currentDirs].reduce((vect, dir) => {
        const {axis, m} = dirs[dir]
        vect[axis] += m
        return vect
    }, [0, 0])
    updateCoords(v)
    context.lineTo(...coords)
    context.closePath()
    context.stroke()
}, 16)