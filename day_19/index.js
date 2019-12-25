amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))


//part 1
let map = Array(50).fill(' ').map(() => Array(50).fill(' '));
for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
        amp0 = new amp(data)
        result = amp0.run([x, y])
        map[x][y] = result[0] == 1 ? "#" : "."
    }
}
count = map.reduce((sum, row) => {
    return sum += row.filter(item => item == "#").length
}, 0)
console.log(count);
//152


//part 2
const width = 2000
let y = 500

while (y < 1000) {
    map = []
    for (x = 0; x < width; x++) {
        amp0 = new amp(data)
        map.push(result = amp0.run([x, y])[0])
    }

    lowLeftCorner = map.findIndex(n => n == 1)
    console.log("Y:" + y + " X:" + map.findIndex(n => n == 1) + " Len:" + map.filter(n => n == 1).length);
    amp0 = new amp(data)
    if (amp0.run([lowLeftCorner + 99, y - 99]) == 1) {
        console.log("found: x:" + lowLeftCorner + " y:" + (y - 99) + " answer:" + (lowLeftCorner * 10000 + y - 99));
        y=1000
    }
    y++
}
//10730411