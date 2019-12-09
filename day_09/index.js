amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))



//Day 9 Part 1
amp0 = new amp(data)
console.log(amp0.run([1]).join(','));
//3409270027

amp0 = new amp(data)
console.log(amp0.run([2]).join(','));
//82760