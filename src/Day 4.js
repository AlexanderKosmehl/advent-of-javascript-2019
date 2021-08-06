function checkPassword(password) {

    // Six digit rule
    if(password.toString().length !== 6) {
        return false
    }

    // Same digit rule
    let sameDigit = []
    let lastDigit = -1
    let lastLastDigit = -2
    for (let digit of password.toString()) {
        if (lastDigit == digit) {
            sameDigit.push(digit)
        }
        if (lastDigit == lastLastDigit && lastDigit == digit) {
            sameDigit = sameDigit.filter(x => x != digit)
        }
        lastLastDigit = lastDigit
        lastDigit = digit
    }

    if (sameDigit.length == 0) {
        return false
    }
    

    // Never decrease rule
    lastDigit = 0
    for (let digit of password.toString()) {
        digit = parseInt(digit)
        if (digit < lastDigit) {
            return false
        }
        lastDigit = digit
    }

    // Passed all checks
    return true
}

console.log(checkPassword(111111))

let possiblePasswords = []
for (let i = 359282; i < 820401; i++) {
    if (checkPassword(i)) {
        possiblePasswords.push(i)
    }
}

console.log(possiblePasswords.length)