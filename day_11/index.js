amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))


//Day 11 Part 1
let robotLocation = { x: 50, y: 50 }
let robotVector = { x: 0, y: -1 }
let painting = Array(200).fill().map(() => Array(200).fill(0));
let painted = new Set()

amp0 = new amp(data)
results = amp0.run(painting[robotLocation.y][robotLocation.x])
painting[robotLocation.y][robotLocation.x] = results[0]
painted.add(JSON.stringify(robotLocation))
robotVector = rotateVector(robotVector, results[1])
robotLocation.x += robotVector.x
robotLocation.y += robotVector.y

while (results.length == 2) {
    results = amp0.run(painting[robotLocation.y][robotLocation.x])
    painting[robotLocation.y][robotLocation.x] = results[0]
    painted.add(JSON.stringify(robotLocation))
    rotateVector(rotateVector, results[1])
    robotVector = rotateVector(robotVector, results[1])
    robotLocation.x += robotVector.x
    robotLocation.y += robotVector.y
}

console.log(painted.size);
//1681


//Part2
robotLocation = { x: 50, y: 50 }
robotVector = { x: 0, y: -1 }
painting = Array(100).fill().map(() => Array(100).fill(0));
painting[robotLocation.y][robotLocation.x]=1
painted = new Set()

amp0 = new amp(data)
results = amp0.run(painting[robotLocation.y][robotLocation.x])
painting[robotLocation.y][robotLocation.x] = results[0]
painted.add(JSON.stringify(robotLocation))
robotVector = rotateVector(robotVector, results[1])
robotLocation.x += robotVector.x
robotLocation.y += robotVector.y

while (results.length == 2) {
    results = amp0.run(painting[robotLocation.y][robotLocation.x])
    painting[robotLocation.y][robotLocation.x] = results[0]
    painted.add(JSON.stringify(robotLocation))
    rotateVector(rotateVector, results[1])
    robotVector = rotateVector(robotVector, results[1])
    robotLocation.x += robotVector.x
    robotLocation.y += robotVector.y
}

console.log(painted.size);
painting.forEach(row => {
    row=row.join('').replace(/0/g,' ')
    console.log(row)
})
//EGZCRKGK



function rotateVector(vector, direction) {
    let x, y
    if (vector.x != 0) x = 0
    if (vector.y != 0) y = 0
    if (direction == 1) {
        if (vector.y == -1) x = 1
        if (vector.y == 1) x = -1
        if (vector.x == -1) y = -1
        if (vector.x == 1) y = 1
    }
    if (direction == 0) {
        if (vector.y == -1) x = -1
        if (vector.y == 1) x = 1
        if (vector.x == -1) y = 1
        if (vector.x == 1) y = -1
    }
    return { x: x, y: y }
}