// const clickableDiv = document.getElementById('clicablediv')

// const body = document.getElementById('body')

// clickableDiv.onclick = function() {
//     alert('CLICKABLE DIV')
// }

// clickableDiv.addEventListener('click', () => {
//     alert('CLICKABLE DIV ADD EVENT LISTENER')
// })

// body.onclick = (e) => {

// }

//element.addEventListener('click', (e) => console.log('hello'))

document.querySelector('#id_button_back').addEventListener('click', (e) => {
    history.back()
})

function f1(e) {
    alert(e.type)
}

let counter = 0

const parent = document.querySelector('#parent')

function f2(e) {
    console.log(counter++)
    const newNode = document.createElement('p')
    newNode.textContent = `Counter: ${counter}`
    parent.append(newNode)
}

const div1 = document.getElementById('div1')

div1.addEventListener('click', f1)
div1.removeEventListener('click', f1)

const div2 = document.getElementById('div2')

div2.addEventListener('click', f2)

function f3(e) {
    e.target.style.backgroundColor = '#ca53df'
    console.log("Тип события: " + e.type)
    console.log(e.target)
}

const div3 = document.getElementById('div3')

div3.addEventListener('click', f3)


const a1 = document.getElementById('a1')

function f4(e) {
    let date = new Date()
    let hours = date.getHours();
    console.log(hours)
    if(hours > 20) {
        e.preventDefault()
        document.write('Child Control Executed')
    }
}

a1.addEventListener('click', f4)


const inner_div = document.getElementById('inner_div')
const outer_div = document.getElementById('outer_div')

inner_div.addEventListener('click', (e) => {
    console.log('inner div')
    //e.stopPropagation()
}, true)
outer_div.addEventListener('click', (e) => {
    console.log('outer div')
    e.stopPropagation()
}, true)
document.body.addEventListener('click', (e) => bodyBgColor(e), true)
document.body.addEventListener('mouseover', (e) => bodyBgColor(e))
document.body.addEventListener('mouseenter', (e) => bodyBgColor(e))

function bodyBgColor(e) {
    if(e.type=='mouseover') document.body.style.backgroundColor = 'aquamarine'
    else if(e.type=='click') document.body.style.backgroundColor = 'coral'
    else if(e.type=='mouseenter') document.body.style.backgroundColor = 'pink'
    else if(e.type=='mouseout') document.body.style.backgroundColor = 'cyan'
}