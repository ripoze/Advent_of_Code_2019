var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split('\n')
data.pop()
data = data.map(row => row.split(''))


let asteroids = []

for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        if (data[y][x] == '#') asteroids.push([x, y])
    }
}

//Part 1
let results = []
for (home of asteroids) {
    let visible = asteroids.reduce((sum, target) => {
        if (isVisible(asteroids, home[0], home[1], target[0], target[1])[0]) {
            sum++
        }
        return sum
    }, 0)
    results.push(visible)
}
console.log(Math.max(...results));
//276 @ 17,22

//Part 2
let resultsPt2 = []
let startAngle = 90
let counter=0
while (asteroids.length > 1 ) {
    counter++
    target = findFirst(asteroids, 17, 22, startAngle)

    if ('x' in target) {
        asteroids = asteroids.filter(function (value, index, arr) {
            return value[0] != target.x || value[1] != target.y
        })
    }
    resultsPt2.push(target)
    startAngle = target.angle + 0.00001
    if (startAngle > 360) startAngle = 0
}
console.log(resultsPt2[199]);
//1321



function isVisible(asteroids, x1, y1, x2, y2) {
    const dx = x1 - x2
    const dy = y1 - y2
    const tan = dy / dx
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180; // 0deg=left
    const distance = Math.abs(dx) + Math.abs(dy)

    if (x1 == x2 && y1 == y2) return false
    //anything ahead?
    //x2,y2 not visible from x1,y1 if same tan, same Math.sign(dx), longer distance
    for (let item of asteroids) {
        const target_dx = x1 - item[0]
        const target_dy = y1 - item[1]
        const target_tan = target_dy / target_dx
        const target_distance = Math.abs(target_dx) + Math.abs(target_dy)

        if (target_tan == tan && Math.sign(target_dx) == Math.sign(dx) && target_distance < distance) {
            return [false]
        }
    }
    return [true, angle, x2, y2]
}

function findFirst(asteroids, x, y, angle) {
    let targets = []
    for (let ast of asteroids) {
        let found = isVisible(asteroids, x, y, ast[0], ast[1])
        if (found[0]) {

            targets.push({ x: found[2], y: found[3], angle: found[1] })
        }
    }
    targets.sort((a, b) => a.angle > b.angle ? 1 : -1)

    targetsFiltered = targets.filter(k => k.angle >= angle)

    //console.log(JSON.stringify(targets))
    if (targetsFiltered.length > 0) {
        return targetsFiltered[0]
    } 
    if(targets.length > 0) {
        return targets[0]
    }
    return null
}