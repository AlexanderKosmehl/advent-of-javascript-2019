const fs = require("fs")

class Coordinate {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function parseCableData(cableData, lastCablePiece) {
    let direction = cableData.substring(0,1)
    let distance = cableData.substring(1)

    let parsedCable = []
    let lastPosition

    for (let i = 0; i < distance; i++) {
        if (parsedCable) {
            lastPosition = lastCablePiece
        } else {
            lastPosition = parsedCable[parsedCable.length-1]
        }

        switch(direction) {
            case "U":
                parsedCable.push(new Coordinate(lastPosition.x, lastPosition.y + 1))
                break
            case "D":
                parsedCable.push(new Coordinate(lastPosition.x, lastPosition.y - 1))
                break
            case "R":
                parsedCable.push(new Coordinate(lastPosition.x + 1, lastPosition.y))
                break
            case "L":
                parsedCable.push(new Coordinate(lastPosition.x - 1, lastPosition.y))
                break
        }
    }
    return parsedCable
}

function compareManhattanDistance(a, b) {
    return (Math.abs(a.x) + Math.abs(a.y)) - (Math.abs(b.x) + Math.abs(b.y))
}

// Solution logic
let input = fs.readFileSync("./../resources/Day 3.txt", "utf8").split("\r\n")

let firstCableData = input[0].split(",")
let secondCableData = input[1].split(",")

let firstCable = [new Coordinate(0,0)]
let secondCable = [new Coordinate(0, 0)]

for (let entry of firstCableData) {
    firstCable.push(...parseCableData(entry, firstCable[firstCable.length - 1]))
}

for (let entry of secondCableData) {
    secondCable.push(...parseCableData(entry, firstCable[firstCable.length - 1]))
}

let crossings = []

for (let firstPiece of firstCable) {
    for (let secondPiece of secondCable) {
        if (firstPiece.x === secondPiece.x && firstPiece.y === secondPiece.y) {
            crossings.push(new Coordinate(firstPiece.x, firstPiece.y))
        }
    }
}

crossings.sort(compareManhattanDistance)

console.log(crossings)

console.log(`The closest crossing is at X:${crossings[1].x} Y:${crossings[1].y} with a Manhattan Distance of ${Math.abs(crossings[1].x) + Math.abs(crossings[1].y)}`)
