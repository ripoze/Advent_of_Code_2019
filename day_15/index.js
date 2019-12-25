amp = require('./amplifier.js')
var keypress = require('keypress');
keypress(process.stdin);

var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))


amp0 = new amp(data)
let x = 20, y = 20
let map = Array(40).fill(' ').map(() => Array(40).fill(' '));
let dir = 0
process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    dir = 0
    if (key && key.ctrl && key.name == 'w') dir = 1
    if (key && key.ctrl && key.name == 's') dir = 2
    if (key && key.ctrl && key.name == 'a') dir = 3
    if (key && key.ctrl && key.name == 'd') dir = 4
    if (dir > 0) result = amp0.run([dir])[0]
    if (result > 0) {
        console.log(result);
        if (dir == 1) y--
        if (dir == 2) y++
        if (dir == 3) x--
        if (dir == 4) x++
        map[y][x] = result == 2 ? "2" : "."
    }
    if (result == 0) {
        if (dir == 1) map[y - 1][x] = "#"
        if (dir == 2) map[y + 1][x] = "#"
        if (dir == 3) map[y][x - 1] = "#"
        if (dir == 4) map[y][x + 1] = "#"

    }

    console.log(`x:${x}, y:${y}, last result:${result}`);
    map[y][x] = 'D'
    map.forEach(row => console.log(row.join('')))
    map[y][x] = '.'


    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

while (dir != 5) {

}

