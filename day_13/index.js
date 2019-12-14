amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))

amp0 = new amp(data)
results = amp0.run([2])

//Part 1
let count = 0
for (let i = 0; i < results.length; i += 3) {
    if (results[i + 2] == 2) count++
}
console.log(count);
//329


//part2

data[0] = 2
amp0 = new amp(data)

let score;
let ballX;
let paddleX;
let joystickPosition = 0

while (results.length > 0) {
    results = amp0.run([joystickPosition])
    for (let i = 0; i < results.length; i += 3) {
        if (results[i] == -1 && results[i + 1] == 0) score = results[i + 2]
        if (results[i + 2] == 3) paddleX = results[i]
        if (results[i + 2] == 4) ballX = results[i]
    }
    joystickPosition = Math.sign(ballX - paddleX)
}
console.log(score);
//15973