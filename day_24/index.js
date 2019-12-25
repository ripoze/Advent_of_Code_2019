let data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(''))


//Part 1
layers = new Array(1000).fill(new Array(5).fill().map(() => Array(5).fill('.')))
layers = JSON.parse(JSON.stringify(layers))
layers[500] = JSON.parse(JSON.stringify(data))
dirversities = new Set()
while (true) {
    diversity = countDiversity(layers[500])
    if (dirversities.has(diversity)) {
        console.log(`Part 1: ${diversity}`)
        break
    }
    dirversities.add(diversity)
    layers[500] = nextStep(layers[500])
}
//18375063


//Part 2
layers = new Array(500).fill(String('.....\n.....\n..?..\n.....\n.....').split('\n').map(row => row.split('')))
layers = JSON.parse(JSON.stringify(layers))
layers[250] = JSON.parse(JSON.stringify(data))
layers[250][2][2]='?'

for (i = 0; i < 200; i++) {
    layers = nextStepPt2(layers)
}


console.log(`Part 2: ${countBugs(layers)}`)
//1959


function countDiversity(data) {
    let diversity = 0
    for (y = 0; y < data.length; y++) {
        for (x = 0; x < data[0].length; x++) {
            if (data[y][x] == '#') diversity += 2 ** (y * data[0].length + x)
        }
    }
    return diversity
}

function print(data, layer) {
    console.log('Layer: ' + layer);
    data[layer].map(row => console.log(row.join('')))
    console.log('');
}

function countBugs(data) {
    let sum = 0
    for (layer of data) {
        for (y of layer) {
            for (x of y) {
                sum += x == '#' ? 1 : 0
            }
        }
    }
    return sum
}

function nextStep(data) {
    const map = JSON.parse(JSON.stringify(data))
    let newMap = JSON.parse(JSON.stringify(data))

    for (y = 0; y < map.length; y++) {
        for (x = 0; x < map[0].length; x++) {
            let adjacent = 0
            adjacent += y > 0 && map[y - 1][x] == "#" ? 1 : 0
            adjacent += y < map.length - 1 && map[y + 1][x] == "#" ? 1 : 0
            adjacent += x > 0 && map[y][x - 1] == "#" ? 1 : 0
            adjacent += x < map[0].length - 1 && map[y][x + 1] == "#" ? 1 : 0
            if (map[y][x] == '#' && adjacent != 1) {
                newMap[y][x] = '.'
            } else {
                if (map[y][x] == '.' && (adjacent == 1 || adjacent == 2)) {
                    newMap[y][x] = '#'
                }
            }
        }
    }
    return newMap
}

function nextStepPt2(layers) {
    const map = JSON.parse(JSON.stringify(layers))
    let newMap = JSON.parse(JSON.stringify(layers))

    for (layer = 0; layer < layers.length; layer++) {
        for (y = 0; y < map[0].length; y++) {
            for (x = 0; x < map[0][0].length; x++) {
                let adjacent = 0

                //from layer below
                if (y == 1 && x == 2 && layer > 0) {
                    adjacent += map[layer - 1][0].reduce((sum, item) => sum += item == '#' ? 1 : 0, 0)
                }
                if (y == 3 && x == 2 && layer > 0) {
                    adjacent += map[layer - 1][4].reduce((sum, item) => sum += item == '#' ? 1 : 0, 0)
                }
                if (y == 2 && x == 1 && layer > 0) {
                    adjacent += map[layer - 1][0][0] == '#' ? 1 : 0
                    adjacent += map[layer - 1][1][0] == '#' ? 1 : 0
                    adjacent += map[layer - 1][2][0] == '#' ? 1 : 0
                    adjacent += map[layer - 1][3][0] == '#' ? 1 : 0
                    adjacent += map[layer - 1][4][0] == '#' ? 1 : 0
                }
                if (y == 2 && x == 3 && layer > 0) {
                    adjacent += map[layer - 1][0][4] == '#' ? 1 : 0
                    adjacent += map[layer - 1][1][4] == '#' ? 1 : 0
                    adjacent += map[layer - 1][2][4] == '#' ? 1 : 0
                    adjacent += map[layer - 1][3][4] == '#' ? 1 : 0
                    adjacent += map[layer - 1][4][4] == '#' ? 1 : 0
                }

                //current layer

                adjacent += y > 0 && map[layer][y - 1][x] == "#" ? 1 : 0
                adjacent += y < map[layer].length - 1 && map[layer][y + 1][x] == "#" ? 1 : 0
                adjacent += x > 0 && map[layer][y][x - 1] == "#" ? 1 : 0
                adjacent += x < map[layer][0].length - 1 && map[layer][y][x + 1] == "#" ? 1 : 0

                //from layer above
                if (y == 0 && layer < layers.length - 1) {
                    adjacent += map[layer + 1][1][2] == '#' ? 1 : 0
                }
                if (y == 4 && layer < layers.length - 1) {
                    adjacent += map[layer + 1][3][2] == '#' ? 1 : 0
                }
                if (x == 0 && layer < layers.length - 1) {
                    adjacent += map[layer + 1][2][1] == '#' ? 1 : 0
                }
                if (x == 4 && layer < layers.length - 1) {
                    adjacent += map[layer + 1][2][3] == '#' ? 1 : 0
                }


                if (map[layer][y][x] == '#' && adjacent != 1) {
                    newMap[layer][y][x] = '.'
                } else {
                    if (map[layer][y][x] == '.' && (adjacent == 1 || adjacent == 2)) {
                        newMap[layer][y][x] = '#'
                    }
                }
            }
        }
    }
    return newMap
}