amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))


// Part 1
codes = generatePhaseSettings([0, 1, 2, 3, 4])
resultpt1 = []
for (code of codes) {
    resultpt1.push(run5codes(code, data))
}
console.log(Math.max(...resultpt1));
//437860

//Part 2
codes = generatePhaseSettings([9, 8, 7, 6, 5])
resultpt2 = []
for (code of codes) {
    resultpt2.push(run5codesPt2(code, data))
}
console.log(Math.max(...resultpt2));
//49810599



function generatePhaseSettings(charset) {
    results = []
    for (i1 of charset) {
        for (i2 of charset) {
            for (i3 of charset) {
                for (i4 of charset) {
                    for (i5 of charset) {
                        result = [i1, i2, i3, i4, i5]
                        if (new Set(result).size == 5)
                            results.push(result)
                    }
                }
            }
        }
    }
    return results
}

function run5codes(inputs, data) {

    amp1 = new amp(data, inputs[0])
    amp2 = new amp(data, inputs[1])
    amp3 = new amp(data, inputs[2])
    amp4 = new amp(data, inputs[3])
    amp5 = new amp(data, inputs[4])
    let r=0
    return amp5.run(amp4.run(amp3.run(amp2.run(amp1.run(r)))))
}

function run5codesPt2(inputs, data) {
    let results = []
    amp1 = new amp(data, inputs[0])
    amp2 = new amp(data, inputs[1])
    amp3 = new amp(data, inputs[2])
    amp4 = new amp(data, inputs[3])
    amp5 = new amp(data, inputs[4])
    let r = 0
    while (r != null) {
        r = amp5.run(amp4.run(amp3.run(amp2.run(amp1.run(r)))))
        if (r != null) results.push(...r)
    }
    return results[results.length - 1]
}