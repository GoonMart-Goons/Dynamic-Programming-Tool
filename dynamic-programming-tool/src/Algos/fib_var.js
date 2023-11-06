const seedrandom = require('seedrandom');

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
        return Math.floor(this.randomizer() * (max))
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

let tree, n
let myID = 0
let nodes, repeatedSub = []

function fib(n, parentID = -1, memo = {}){
    const node = {
        value: undefined,
        pid: undefined,
        id: undefined
    }
    node.pid = parentID
    node.id = myID
    myID++

    if(n in memo){
        node.value = memo[n]
        nodes.push(node)
        repeatedSub.push(node)
        return memo[n]
    }
    
    if(n <= 2){
        node.value = 1
        nodes.push(node)
        return 1
    }
    
    memo[n] = fib(n-1, node.id, memo) + fib(n-2, node.id, memo)
    node.value = memo[n]
    nodes.push(node)
    return memo[n]
}

function getFibQuestion(){
    //Reset global vars to reuse question w/out problems
    myID = 0
    nodes = []

    const random = new rng(Date.now())
    n = random.randomRangeInt(3, 9)

    let question = 'A) Using the fibonacci algorithm, construct the resultant tree of fib(' + n + ')'
                    + '\n\n' +
                    'B) In which nodes (if any) was the repeating substructure property demonstated? Write out the node IDs'

    return question
}

/*function getFibAnswer(){
    fib(n)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    return tree.root.serializeTree()
}*/

//export { getFibQuestion, getFibAnswer }

console.log(getFibQuestion())
const out = fib(n)
console.log(out)
console.log(repeatedSub)
console.log(nodes)