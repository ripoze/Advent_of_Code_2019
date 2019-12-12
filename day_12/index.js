var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.replace(/</g, '{').replace(/>/g, '}').replace(/=/g, ':').replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').split('\n')
data.pop()
data = data.map(item => JSON.parse(item))

let planets = []
for (item of data) {
    planets.push({ pos: { x: item.x, y: item.y, z: item.z }, vel: { x: 0, y: 0, z: 0 } })
}

//Part1
for (steps = 0; steps < 1000; steps++) {
    planets = applyGravity(planets)
    planets = applyVeloctiy(planets)
}
printPlanets(planets)
console.log(totalEnergy(planets));
//7179


//Part2
planets = []
for (item of data) {
    planets.push({ pos: { x: item.x, y: item.y, z: item.z }, vel: { x: 0, y: 0, z: 0 } })
}
const start = JSON.parse(JSON.stringify(planets))
let count = 0
let x_period = 0
let y_period = 0
let z_period = 0

while (x_period < 1 || y_period < 1 || z_period < 1) {
    planets = applyGravity(planets)
    planets = applyVeloctiy(planets)
    count++
    if (planets[0].vel.x == 0 && planets[1].vel.x == 0 && planets[2].vel.x == 0 && planets[3].vel.x == 0 && x_period == 0) x_period = count
    if (planets[0].vel.y == 0 && planets[1].vel.y == 0 && planets[2].vel.y == 0 && planets[3].vel.y == 0 && y_period == 0) y_period = count
    if (planets[0].vel.z == 0 && planets[1].vel.z == 0 && planets[2].vel.z == 0 && planets[3].vel.z == 0 && z_period == 0) z_period = count
}
console.log(x_period * y_period * z_period);
//428576638953552


function applyGravity(d) {
    d.forEach(planet1 => {
        d.forEach(planet2 => {
            if (planet1.pos.x < planet2.pos.x) planet1.vel.x++
            if (planet1.pos.x > planet2.pos.x) planet1.vel.x--
            if (planet1.pos.y < planet2.pos.y) planet1.vel.y++
            if (planet1.pos.y > planet2.pos.y) planet1.vel.y--
            if (planet1.pos.z < planet2.pos.z) planet1.vel.z++
            if (planet1.pos.z > planet2.pos.z) planet1.vel.z--
        })
    })
    return d
}
function applyVeloctiy(d) {
    d = d.map(planet => {
        planet.pos.x += planet.vel.x
        planet.pos.y += planet.vel.y
        planet.pos.z += planet.vel.z
        return planet
    })
    return d
}

function totalEnergy(d) {
    let energy = 0
    d.forEach(planet => {
        energy += (Math.abs(planet.pos.x) + Math.abs(planet.pos.y) + Math.abs(planet.pos.z)) * (Math.abs(planet.vel.x) + Math.abs(planet.vel.y) + Math.abs(planet.vel.z))
    })
    return energy
}

function printPlanets(d) {
    d.forEach(planet => {
        console.log(`pos=<x=${planet.pos.x},\ty=${planet.pos.y},\tz=${planet.pos.z}>,\tvel=<x=${planet.vel.x},\ty=${planet.vel.y},\tz=${planet.vel.z}>`)
    })
    console.log('\n');
}