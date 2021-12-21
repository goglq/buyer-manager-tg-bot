// console.log(`'3' == 3 => ${'3' == 3}`)
// console.log(`'3' === 3 => ${'3' === 3}`)
// console.log(`'' == false => ${'' == false}`)
// console.log(`'' === false => ${'' === false}`)

// console.log('-------------------------------');

// console.log('alert, confirm, prompt')
// var num = +prompt("Enter a number")
// console.log(`You entered: ${num}`)
// var str = ''

// switch(num) {
//     case 1:
//         str += '1'
//         break
//     case 2:
//         str += '2'
//         break
//     case 3:
//         str += '3'
//         break
//     default:
//         str += '0'
// }

// console.log(`str = ${str}`)

// console.log('-------------------------------');

// //Объект как ассоциативный массив
// const obj1 = {
//     key1: 'abc'
// }

// const obj2 = {
//     key2: 'odc'
// }

// Object.assign(obj1, obj2)

// console.log("obj1 and obj2 after assign method")
// console.log(obj1)

// const myCopy = Object.assign({}, obj1)
// myCopy.key3='zxc'
// console.log(obj1)
// console.log(myCopy)

// console.log(Object.keys(myCopy))

// const person = {
//     firstName: 'Sam',
//     lastName: 'Smith'
// }

// console.log('Hey ' + Object.values(person).join(' ') + '!')
// person.age = 20
// console.log(person)

// Object.seal(person)
// person.address = 'st. address'
// console.log(person);

// //В строгом режиме ('strict') выкинет ошибку
// Object.freeze(myCopy)
// myCopy.key1 = 'qwerty'
// console.log(myCopy)

//classes

class Car {
    constructor(model, color) {
        this.model = model
        this.wheels = 4
        this.color = color
    }

    toString() {
        return `${model} has ${wheels} wheels and his color is ${color}`    
    }
}

const mcLaren = new Car('McLaren', 'red')
console.log(mcLaren)

const tractor = new Car('Lamborghini', 'yellow')
tractor.crane = 'Tractor Crane'
console.log(tractor)

const entries = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
])

const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)

let array_a = []
console.log(array_a)

let array_b = array_a
array_b[0] = 1
array_b[1] = 'hello'
array_b[2] = true

for(let i = 0; i < array_b.length; i ++){
    const element = array_b[i]
    console.log(element)
}

delete array_b[2]

console.log(array_a)
console.log(array_b)
























