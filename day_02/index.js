var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))

// Part 1
console.log(intcode(12, 2, data))

//Part2
for (noun = 0; noun <= 99; noun++) {
    for (verb = 0; verb <= 99; verb++) {
        if (intcode(noun, verb, data) == 19690720) console.log(100 * noun + verb);
    }
}


function intcode(data1, data2, datain) {
    let data=[...datain]
    data[1] = data1
    data[2] = data2
    for (i = 0; i < data.length; i += 4) {
        switch (data[i]) {
            case 1:
                data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]]
                break
            case 2:
                data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]]
                break
            case 99:
                break
        }
    }
    return data[0]
}