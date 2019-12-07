var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split('\n').map(item => item.split(')'))


//Part 1
let sum = data.reduce((sum, item) => {
    //onsole.log(item + "\t" + stepsToCOM(item[1]));
    return sum + stepsToCOM(item[1]).length
}, 0)
console.log(sum);


//Part2
let you = stepsToCOM('YOU')
let san = stepsToCOM('SAN')
let unique = new Set(you.concat(san))
let duplicatesCount = you.length + san.length - unique.size
console.log(unique.size - duplicatesCount);



function getOrbiting(item) {
    //console.log('run '+item);
    orbiting = []
    for (i = 0; i < data.length; i++) {
        if (data[i][1] == item) {
            orbiting.push(data[i][0])
        }
    }
    return orbiting
}

function stepsToCOM(item) {
    path = Array.isArray(item) ? [...item] : [item]
    while (path[path.length - 1] != "COM") {
        let list = getOrbiting(path[path.length - 1])
        path.push(...list)
    }
    return path.slice(1)
}