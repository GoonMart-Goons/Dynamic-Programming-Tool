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

let tree, myID = 0
let nodes = []
let targetSum, numbers

function bestSum(targetSum, numbers, parentID = -1, memo = {}, rsub = []){  
    
    if (targetSum < 0)
        return [null, rsub, nodes]
    
    const node = {
        value: targetSum,
        pid: parentID,
        id: myID
    }
    myID++
    nodes.push(node)

    if (targetSum in memo){
        rsub.push(node)
        return [memo[targetSum], rsub, nodes]
    }
    if (targetSum === 0) 
        return [[], rsub, nodes]
    

    let shortestCombination = null

    for(let num of numbers){
        const remainder = targetSum - num
        const remainderResult = bestSum(remainder, numbers, node.id, memo, rsub)[0]
        if (remainderResult !== null){
            const combination = [...remainderResult, [node, num]]
            if (shortestCombination === null || combination.length < shortestCombination.length){
                shortestCombination = combination
            }
        }
    }

    memo[targetSum] = shortestCombination
    return [shortestCombination, rsub, nodes ]
}


function getBestSumQuestion(){
    //Reset global vars
    myID = 0
    nodes = []

    const random = new rng(Date.now())

    targetSum = random.randomRangeInt(5, 20)
    const numbersLen = random.randomRangeInt(2, 4)
    numbers = []

    const freeNumbers = []
    for(let i = 2; i <= targetSum; i++)
        freeNumbers.push(i)

    for(let i = 0; i < numbersLen; i++){
        const num = random.pickFrom(freeNumbers)
        numbers.push(num)
        freeNumbers.splice(freeNumbers.indexOf(num), 1)

    }

    /*let question = 'Using the bestSum algorithm, construct the resultant tree given:\n'
        + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers*/

    let question = 'A) Using the bestSum algorithm, construct the resultant tree given:\n'
                    + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers
                    + '\n\n' 
                    + 'B) What is the path of nodes that produce the shortest combination of the targetSum' //(this is obtained from the 0-th index of the element in the  out[0] array). It is also exculusive of the node with the value 0
                    // OR -> What is the smallest combination of values that produce the targetSum'
                    + '\n\n'
                    + 'C) In which nodes (if any) was the repeating substructure property demonstated? Write out the node IDs'

    return question
}

/*function getBestSumAnswer(){
    bestSum(targetSum, numbers)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    console.log(tree.root.serializeTree())
    return tree.root.serializeTree()
}*/

console.log(getBestSumQuestion())

const out = bestSum(targetSum, numbers)

console.log(out[0]) //Shortest path and smallest combination
console.log(out[1]) //Nodes that were obtained through memoisation
console.log(out[2]) //All nodes in tree