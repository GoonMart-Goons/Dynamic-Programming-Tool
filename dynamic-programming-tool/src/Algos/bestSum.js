import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

let tree, myID = 0
let nodes = [], repeatedSub = []
let targetSum, numbers

function bestSum(targetSum, numbers, parentID = -1, memo = {}){  
    
    if (targetSum < 0)
        return null
    
    const node = {
        value: targetSum,
        pid: parentID,
        id: myID
    }
    myID++
    nodes.push(node)

    if (targetSum in memo){
        repeatedSub.push(node.id)
        return memo[targetSum]
    }
    if (targetSum === 0) 
        return [node.id]
    

    let shortestCombination = null

    for(let num of numbers){
        const remainder = targetSum - num
        const remainderResult = bestSum(remainder, numbers, node.id, memo)
        if (remainderResult !== null){
            // const combination = [...remainderResult, {id: node.id, num: targetSum}]
            const combination = [...remainderResult, node.id]
            if (shortestCombination === null || combination.length < shortestCombination.length){
                shortestCombination = combination
            }
        }
    }

    memo[targetSum] = shortestCombination
    return shortestCombination
}


function getBestSumQuestion(){
    //Reset global vars
    myID = 0
    nodes = []
    repeatedSub = []

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
                    + 'B) What is the path of nodes that produce the shortest combination of the targetSum? ' + 
                    'In the case that a memoised node is used, use the id of the orignal node and not that of the repeated node. ' + 
                    'In the case that there is no shortest path, answer -1.'
                    // OR -> What is the smallest combination of values that produce the targetSum'
                    + '\n\n'
                    + 'C) In which nodes (if any) was the repeating substructure property demonstated? Write out the node IDs'

    return question
}

function getBestSumAnswer(){    
    var out = bestSum(targetSum, numbers)
    if (out === null){
        out = -1
    }else{
        out = out.slice().reverse()
    } 

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    // console.log('Tree:', tree.root.serializeTree())
    // console.log('Shortest:', out) //Shortest path and smallest combination
    // console.log('Repeated:', repeatedSub) //Nodes that were obtained through memoisation
    return [tree.root.serializeTree(), out, repeatedSub]
}

export { getBestSumQuestion, getBestSumAnswer }

// console.log('Shortest:', out) //Shortest path and smallest combination
// console.log('Repeated:', repeatedSub) //Nodes that were obtained through memoisation
// console.log('Nodes:', nodes) //All nodes in tree