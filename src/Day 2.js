const fs = require("fs")

let input = fs.readFileSync("./../resources/Day 2.txt", "utf8").split("/").map(x => parseInt(x))

function calculateIntCode(input) {
    let position = 0
    let stop = false

    while (position < input.length && stop !== true) {
        switch (input[position]){
            case 1:
                input[input[position + 3]] = input[input[position + 1]] + input[input[position + 2]]
                position += 4
                break
            case 2:
                input[input[position + 3]] = input[input[position + 1]] * input[input[position + 2]]
                position += 4
                break
            case 99:
                stop = true
                break
        }
    }

    return input
}

function taskOne() {
    let intCode = [...input]

    // SETUP
    intCode[1] = 12
    intCode[2] = 2

    intCode = calculateIntCode(intCode)

    console.log(`The solution is ${intCode[0]}`)
}

function taskTwo() {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let intCode = [...input]
            intCode[1] = noun
            intCode[2] = verb

            intCode = calculateIntCode(intCode)

            if (intCode[0] === 19690720) {
                console.log(`Found it! Noun: ${noun} Verb: ${verb}`)
                console.log(`100 * ${noun} + ${verb} = ${100 * noun + verb}`)
            }
        }
    }
}

taskOne()
taskTwo()




