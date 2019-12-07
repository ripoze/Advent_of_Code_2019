class Amplifier {
    constructor(data, phasecode) {
        this.data = [...data]
        this.i = 0
        this.phasecode = phasecode
        this.run(this.phasecode)
    }

    run(inputs) {
        if(inputs==null) return null
        let output = []
        let data = this.data
        if(!Array.isArray(inputs)) inputs=[inputs]

        while (this.i < data.length) {
            let instruction = pad(data[this.i], 5)
            let opcode = instruction.slice(3, 5)
            let params = instruction.slice(0, 3).split('').reverse()
            let value1, value2, value3
            //let output=[]

            params[0] == 1 ? value1 = data[this.i + 1] : value1 = data[data[this.i + 1]]
            params[1] == 1 ? value2 = data[this.i + 2] : value2 = data[data[this.i + 2]]
            params[2] == 1 ? value3 = data[this.i + 3] : value3 = data[data[this.i + 3]]
            switch (Number(opcode)) {
                case 1:
                    data[data[this.i + 3]] = value1 + value2
                    this.i += 4
                    break
                case 2:
                    data[data[this.i + 3]] = value1 * value2
                    this.i += 4
                    break
                case 3:
                    if(inputs.length==0) return
                    data[data[this.i + 1]] = Number(inputs[0])
                    if (inputs.length > 0) {
                        inputs.shift()
                    } 
                    this.i += 2
                    break
                case 4:
                    this.i += 2
                    output.push(value1)
                    break
                case 5:
                    value1 != 0 ? this.i = value2 : this.i += 3
                    break
                case 6:
                    value1 == 0 ? this.i = value2 : this.i += 3
                    break
                case 7:
                    data[data[this.i + 3]] = value1 < value2 ? 1 : 0
                    this.i += 4
                    break
                case 8:
                    data[data[this.i + 3]] = value1 == value2 ? 1 : 0
                    this.i += 4
                    break
                case 99:
                    this.i = data.length
                    output=null
                    break
                default:
                    this.i++

            }
            if(output == null || output.length > 0) {
                break
            }
        }
        return output

        function pad(num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
        }
    }
}
module.exports = Amplifier