var f = 10
if(true) {
    var  f = 'abc'
}

if(!false) {
    let f = 'def'
    console.log('Local f', f);
}

for(let i = 0; i < 5; i++)
    showIndex(i)

function showIndex(i) {
    console.log(i)
}

const person = {
    name: 'John',
    action: 'wants to watch'
}

const cnt = Array.from(['Wonder Woman', 'Spider-man: No Way Home', 'Godzilla'], (i) => `I want to watch ${i}`)
console.log(cnt);