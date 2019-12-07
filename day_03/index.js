const data = require('fs').readFileSync('input.txt', 'utf8')
let wires = { input: [], coords: [] }
wires.input = data.split('\n')
wires.input.pop()
wires.input = wires.input.map(wire => wire.split(','))

for (i = 0; i < wires.input.length; i++) {
    let location = { x: 0, y: 0 }
    wires.coords.push([])
    wires.coords[i].push({ ...location })
    wires.input[i].forEach(item => {
        let direction = item[0]
        let length = item.slice(1)
        for (n = 0; n < length; n++) {
            if (direction === 'U') location.y--
            if (direction === 'D') location.y++
            if (direction === 'L') location.x--
            if (direction === 'R') location.x++
            wires.coords[i].push({ ...location })
        }
    })
}

let results = []
for (i1 = 0; i1 < wires.coords[0].length; i1++) {
    for (i2 = 0; i2 < wires.coords[1].length; i2++) {
        if (wires.coords[0][i1].x == wires.coords[1][i2].x && wires.coords[0][i1].y == wires.coords[1][i2].y) results.push({ ...wires.coords[0][i1], steps1: i1, steps2: i2 })
    }
}


results.forEach(r => {
    console.log(`Coords x:${r.x}, y:${r.y}, distance:${Math.abs(r.x) + Math.abs(r.y)}, steps1:${r.steps1}, steps2:${r.steps2}, total steps:${r.steps1 + r.steps2}`)
})