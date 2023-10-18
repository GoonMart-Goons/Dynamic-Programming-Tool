// const seedrandom = require('seedrandom')
import seedrandom from "seedrandom"

class rng{
    constructor(seed){
        this.seed = seed
        this.randomizer = seedrandom(this.seed)
    }

    setSeed(newSeed){
        this.seed = newSeed
        this.randomizer = seedrandom(this.seed)
    }
    
    random(){
        return this.randomizer()
    }

    randomInt(max){
        return Math.floor(this.randomizer() * (max + 1))
    }

    randomRange(min, max){
        return this.randomizer() * (max - min) + min
    }
    randomRangeInt(min, max){
        return Math.floor(this.randomizer() * (max - min + 1)) + min
    }

    pickFrom(numbers){
        return numbers[this.randomInt(numbers.length)]
    }
}

export { rng }

// r = new rng('hello.')
// console.log(r.random())
// for(i = 0; i < 10; i++)
//     console.log(i, r.randomRange(2, 4))