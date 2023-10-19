import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

let tree
let targetSum, numbers

function canSum(targetSum, numbers, parentID, memo = {}){   
    let node, ID

    if (parentID === -1){
        tree = new Tree(targetSum)
        ID = 0
    }
    else{
        node = new TreeNode(targetSum)
        ID = node.ID
        tree.insertByID(parentID, node)
    }

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
        else if (canSum(remainder, numbers, ID, memo) === true){
            memo[targetSum] = true
            return true
        }
    }

    memo[targetSum] = false
    return false
}

function getQuestion(){
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
        + 'Target Sum = ' + String(targetSum) + ' and the numbers list ' + String(numbers)
    // console.log(question)

    return question

    // console.log('answer:', canSum(targetSum, numbers, -1))
    // console.log('serialized tree:', tree.root.serializeTree())
}

function getAnswer(){
    canSum(targetSum, numbers, -1)
    console.log('Tree', tree)
    return tree.root.serializeTree()
}

export { getQuestion, getAnswer }