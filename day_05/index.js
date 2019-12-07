var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))

// Part 1
console.log(intcode(1, data).join(','))
//15259545

// Part 2
console.log(intcode(5, data).join(','))
//7616021

function intcode(input, datain) {
    let data = [...datain]
    let output = []
    let i = 0
    while (i < data.length) {
        instruction = pad(data[i], 5)
        let opcode = instruction.slice(3, 5)
        let params = instruction.slice(0, 3).split('').reverse()
        params[0] == 1 ? value1 = data[i + 1] : value1 = data[data[i + 1]]
        params[1] == 1 ? value2 = data[i + 2] : value2 = data[data[i + 2]]
        params[2] == 1 ? value3 = data[i + 3] : value3 = data[data[i + 3]]
        switch (Number(opcode)) {
            case 1:
                data[data[i + 3]] = value1 + value2
                i += 4
                break
            case 2:
                data[data[i + 3]] = value1 * value2
                i += 4
                break
            case 3:
                data[data[i + 1]] = Number(input)
                i += 2
                break
            case 4:
                output.push(value1)
                i += 2
                break
            case 5:
                value1 != 0 ? i = value2 : i += 3
                break
            case 6:
                value1 == 0 ? i = value2 : i += 3
                break
            case 7:
                data[data[i + 3]] = value1 < value2 ? 1 : 0
                i += 4
                break
            case 8:
                data[data[i + 3]] = value1 == value2 ? 1 : 0
                i += 4
                break
            case 99:
                i = data.length
                break
            default:
                i++

        }
    }
    return output
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}