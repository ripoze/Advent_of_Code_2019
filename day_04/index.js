const minCode = 347312
const maxCode = 805915

console.log(checkCodePart2(800111))

let codes=0
let codesPart2=0
for(let i = minCode; i<=maxCode; i++){
    if(checkCode(i)) {
        codes++
        if(checkCodePart2(i)) {
            codesPart2++
        }
    }
}
console.log('Possible codes:' + codes + ' Part2:'+ codesPart2)
//pt2: 196 too low

function checkCode(code) {
    let result = true
    codeStr = code.toString()

    //Length == 6 
    if (codeStr.length != 6) result = false

    //Has double digit
    if (codeStr.match(/([0-9])\1+/g) == null) result = false
    

    //Numbers increae left to right
    for (i = 1; i < codeStr.length; i++) {
        if (Number(codeStr[i - 1]) > Number(codeStr[i])){
            result = false
        } 
    }
    return result
}

function checkCodePart2(code){
    let result = true
    codeStr = code.toString()
    codeStr = codeStr.replace(/([0-9])\1\1+/g, '')
    if (codeStr.match(/([0-9])\1+/g) == null) result = false
    return result
}