const RandomNumber = Math.random() * 6 + 1
console.log(`Math.random() = ${RandomNumber}`)

console.log(`Math.floor(Math.Random()) = ${Math.floor(RandomNumber)}`)

function getRandomValue(min, max) {
    return (Math.random() * min + max - min)
}

console.log(`Custom Function: getRandomValue(5, 10) = ${getRandomValue(5, 10)}`)

