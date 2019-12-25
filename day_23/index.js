amp = require('./amplifier.js')
var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.split(',').map(item => Number(item))
let outputs = []
let nat = []
let yValuesToNAT= new Set()

//part 1
let amps = Array(50)



//boot computers
for (i = 0; i < amps.length; i++) {
    amps[i] = new amp(data)
    res = amps[i].run([i])
}
let test = new amp(data)

//loop
let found = false
while (true) {
    for (i = 0; i < amps.length; i++) {
        cmd = outputs.filter(item => item[0] == i)
        if (cmd.length > 0) {
            result = amps[i].run([cmd[0][1], cmd[0][2]])
            outputs = outputs.filter(item => item[0] != cmd[0][0] || item[1] != cmd[0][1] || item[2] != cmd[0][2])

        } else {
            result = amps[i].run([])
        }
        if (result.length > 0) {
            //console.log("Amp: " + i + " " + result.join(','));
            outputs.push(result)
            if (result[0] == 255) {
                console.log("Found NAT packet: " + result.join(','));
                found = true
                nat = [result[1], result[2]]
                if(yValuesToNAT.has(nat[1])) console.log(nat[1]+ " twice");
                yValuesToNAT.add(nat[1])
            }
        }
    }
    idle = amps.reduce((acc, amp) => {
        if(!amp.isIdle()) return false 
        return acc
    }, true)
    if(idle && nat.length>0) {
        console.log("idle network");

        outputs.push([0, ...nat])
        nat=[]
    }
}

//Part 2 19020 too high