var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.split('\n')
data.pop()

// Part 1
let result = data.reduce((acc, val) => {
    return acc + calculateFuel(val)
}, 0)
console.log(`Part 1: ${result}`)

//Part 2
result = data.reduce((acc, val) => {
    return acc + calculateFuel2(val)
}, 0)
console.log(`Part 2: ${result}`)



function calculateFuel(mass){
    return Math.floor(Number(mass) / 3) - 2
}

function calculateFuel2(mass){
    let fuel=calculateFuel(mass)
    let fuelSum=fuel
    while(calculateFuel(fuel) > 0){
        fuel=calculateFuel(fuel)
        fuelSum += fuel
    }
    return fuelSum
}