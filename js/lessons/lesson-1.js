var f = 10
if(true) {
    var  f = 'abc'
}

if(!false) {
    let f = 'def'
    console.log('Local f', f);
}

console.log(f)