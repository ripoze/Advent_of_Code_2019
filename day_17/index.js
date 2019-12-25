amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split(',').map(item => Number(item))


//part 1

amp0 = new amp(data)
map = amp0.run([])
map = map.map(code => String.fromCharCode(code)).join('')
console.log(map);
map = map.split('\n')

let intersections = []
for (y = 1; y < map.length - 1; y++) {
    for (x = 1; x < map[0].length - 1; x++) {
        if (map[x][y] == '#' && map[x + 1][y] == '#' && map[x - 1][y] == '#' && map[x][y + 1] == '#' && map[x][y - 1] == '#') {
            intersections.push([x, y])
        }
    }
}
let sum = intersections.reduce((sum, item) => sum += item[0] * item[1], 0)
console.log("Part 1: " + sum)
//6680


//Part 2

/*
A - L,8,R,10,L,8,R,8
B - L,12,R,8,R,8
C - L,8,R,6,R,6,R,10,L,8

A,B,A,C,C,A,B,C,B,B
*/
data[0] = 2
amp0 = new amp(data)
map = amp0.run(stringToAsciiArray('A,B,A,C,C,A,B,C,B,B'))
console.log(map.map(code => String.fromCharCode(code)).join(''));

map = amp0.run(stringToAsciiArray('L,8,R,10,L,8,R,8'))
console.log(map.map(code => String.fromCharCode(code)).join(''));

map = amp0.run(stringToAsciiArray('L,12,R,8,R,8'))
console.log(map.map(code => String.fromCharCode(code)).join(''));

map = amp0.run(stringToAsciiArray('L,8,R,6,R,6,R,10,L,8'))
console.log(map.map(code => String.fromCharCode(code)).join(''));

map = amp0.run(stringToAsciiArray('n'))
console.log(map.map(code => String.fromCharCode(code)).join(''));
console.log(map[map.length-1]);
//1103905



function stringToAsciiArray(str){
    result = []
    str.split('').forEach(char=>{
        result.push(char.charCodeAt(0))
    })
    result.push(10)
    return result
}