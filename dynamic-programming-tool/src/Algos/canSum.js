import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

let tree, myID = 0
let nodes = []
let targetSum, numbers

function canSum(targetSum, numbers, parentID = -1, memo = {}){  
    const node = {
        value: targetSum,
        pid: parentID,
        id: myID
    }
    myID++
    nodes.push(node)

    if (targetSum in memo)
        return memo[targetSum]
    if (targetSum === 0) 
        return true

    for(let num of numbers){
        const remainder = targetSum - num
        if (remainder < 0){
            memo[targetSum] = false
            return false
        }
        else if (canSum(remainder, numbers, node.id, memo) === true){
            memo[targetSum] = true
            return true
        }
    }

    memo[targetSum] = false
    return false
}

function getCanSumQuestion(){
    //Reset global vars
    myID = 0
    nodes = []

    const random = new rng(Date.now())

    targetSum = random.randomRangeInt(5, 30)
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

    let question = 'Using the canSum algorithm, construct the resultant tree given:\n'
        + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers

    return question
}

function getCanSumAnswer(){
    canSum(targetSum, numbers)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    console.log(tree.root.serializeTree())
    return tree.root.serializeTree()
}

export { getCanSumQuestion, getCanSumAnswer }