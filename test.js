function randomRangeInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomInt(max){
    return Math.floor(Math.random() * (max + 1))
}

for(var i = 0; i < 100; i++)
    console.log(i, randomInt(5))