class Amplifier {
    constructor(data) {
        this.data = [...data]
        this.data = this.data.concat(Array(10000).fill(0))
        this.i = 0
        //this.phasecode = phasecode
        this.relativeBase = 0
        //this.run(this.phasecode)
    }

    run(inputs) {
        if (inputs == null) return null
        let output = []
        let data = this.data
        if (!Array.isArray(inputs)) inputs = [inputs]

        while (this.i < data.length) {
            //console.log(data.join(','));
            let instruction = pad(data[this.i], 5)
            let opcode = instruction.slice(3, 5)
            let params = instruction.slice(0, 3).split('').reverse()
            let value1, value2, value3

            if (params[0] == 0) value1 = data[data[this.i + 1]] //position mode
            if (params[0] == 1) value1 = data[this.i + 1] //immediate mode
            if (params[0] == 2) value1 = data[this.relativeBase + data[this.i + 1]] //relative mode

            if (params[1] == 0) value2 = data[data[this.i + 2]] //position mode
            if (params[1] == 1) value2 = data[this.i + 2] //immediate mode
            if (params[1] == 2) value2 = data[this.relativeBase + data[this.i + 2]] //relative mode

            if (params[2] == 0) value3 = data[data[this.i + 3]] //position mode
            if (params[2] == 1) value3 = data[this.i + 3] //immediate mode
            if (params[2] == 2) value3 = data[this.relativeBase + data[this.i + 3]] //relative mode


            switch (Number(opcode)) {
                case 1:
                    if (params[2] == 0) value3 = data[this.i + 3] //position mode
                    if (params[2] == 2) value3 = this.relativeBase + data[this.i + 3] //relative mode
                    data[value3] = value1 + value2
                    this.i += 4
                    break
                case 2:
                    if (params[2] == 0) value3 = data[this.i + 3] //position mode
                    if (params[2] == 2) value3 = this.relativeBase + data[this.i + 3] //relative mode
                    data[value3] = value1 * value2
                    this.i += 4
                    break
                case 3:
                    if (inputs.length == 0) return output
                    if (params[0] == 0) value1 = data[this.i + 1] //position mode
                    if (params[0] == 2) value1 = this.relativeBase + data[this.i + 1] //relative mode
                    data[value1] = Number(inputs[0])
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
                    if (params[2] == 0) value3 = data[this.i + 3] //position mode
                    if (params[2] == 2) value3 = this.relativeBase + data[this.i + 3] //relative mode
                    data[value3] = value1 < value2 ? 1 : 0
                    this.i += 4
                    break
                case 8:
                    if (params[2] == 0) value3 = data[this.i + 3] //position mode
                    if (params[2] == 2) value3 = this.relativeBase + data[this.i + 3] //relative mode
                    data[value3] = value1 == value2 ? 1 : 0
                    this.i += 4
                    break
                case 9:
                    this.relativeBase += value1
                    this.i += 2
                    break
                case 99:
                    this.i = data.length
                    //output = null
                    break
                default:
                    console.log('default')
                    this.i++

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