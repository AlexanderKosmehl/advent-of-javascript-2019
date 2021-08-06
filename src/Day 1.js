const fs = require("fs")

function calculateFuel(weight) {
    return  Math.floor((parseInt(weight) / 3)) - 2
}

function calculateFuelFuel(weight) {
    let fuelFuel = 0
    while (weight > 0) {
        weight = calculateFuel(weight)
        fuelFuel += weight
    }
    return fuelFuel
}

function solution() {
    let fuel = 0

    fs.readFile("../resources/Day 1.txt","utf8", (err, data) => {
        if (err) {
            return console.log(err)
        }

        let weight = data.split("\r\n")

        let fuel = weight.map(x => calculateFuel(x)).reduce((acc, cur) => acc + cur)

        let fuelFuel = weight.map(x => calculateFuelFuel(x)).reduce((acc, cur) => acc + cur)

        console.log(`${fuel} units of fuel required, which need further fuel, which means you need ${fuelFuel} units of fuel in total.`)
    })
}

solution()
