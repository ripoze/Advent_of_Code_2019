var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split('')
data.pop()

const width = 25
const height = 6
let layers = []

while (data.length > 0) {
    layers.push(data.splice(0, width * height))
}

//Part 1
let res = countFewestDigits(layers, 0)
console.log(countDigits(res, 1) * countDigits(res, 2));
//1820


//Part2
let res2 = joinLayers(layers)
res2 = res2.join('').replace(/0/g, " ").split('')
while (res2.length > 0) {
    console.log(res2.splice(0, width).join(''))
}
//ZUKCJ


function countFewestDigits(data, d) {
    let index = 0
    let digits = 1000000
    for (i = 0; i < data.length; i++) {
        count = data[i].filter(item => item == d).length
        if (count < digits) {
            index = i
            digits = count
        }
    }
    return data[index]
}

function countDigits(data, d) {
    return data.filter(item => item == d).length
}

function joinLayers(data) {
    let result = data[data.length - 1]
    for (i = data.length - 1; i >= 0; i--) {
        for (n = 0; n < data[i].length; n++) {
            if (data[i][n] == 1 || data[i][n] == 0) result[n] = data[i][n]
        }
    }
    return result
}