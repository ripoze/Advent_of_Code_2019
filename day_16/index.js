var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim()
const basePattern = [0, 1, 0, -1]

//Part 1

let input = data
for(i=0; i<100; i++){
    input=fft(input, basePattern)
    //console.log(`Phase ${i+1}: ${input.slice(0,8)}`)
}
console.log(input.slice(0,8))

//85726502

//Part 2



input="12345"
input = new Array(650).fill(1).join('')
const chunk = input.length

let input2=''
for(i=0; i<20; i++) {
    input2 += input
}
for(i=0; i<1; i++){
    input2=fft(input2, basePattern)
}

let results=chunkArray(input2, input.length*2)

//console.log(input2)
//console.log(results)
//3505


function chunkArray(arr, chunk){
    let results=[]
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        results.push(temparray)
    }
    return results  
}
function fft(input, basePattern) {
    let date1 = new Date()
    let result = ''
    result = input.split('').reduce((acc, val, index) => {
        return acc+ calculateElement(input, basePattern, index)
    }, '')
    console.log(new Date() - date1)
    return result
}

function calculateElement(input, basePattern, position) {
    const pattern = createPattern(basePattern, input.length, position)
    input = input.split('')
    let result = input.reduce((sum, val, index) => {
        sum += Number(val) * pattern[index]
        return sum
    }, 0)
    return Math.abs(result) % 10
}

function createPattern(basePattern, inputLength, position) {
    const repeats = position + 1
    let pattern = []
    for (let i = 0; i < inputLength + 1; i += repeats) {
        for (let n = 0; n < repeats; n++) {
            pattern[i + n] = basePattern[i / repeats % basePattern.length]
        }
    }
    pattern.shift()
    pattern.length = inputLength
    return pattern
}

