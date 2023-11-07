import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

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
        repeatedSub.push(node.id)
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
    repeatedSub = []

    const random = new rng(Date.now())
    n = random.randomRangeInt(3, 9)

    let question = 'A) Using the fibonacci algorithm, construct the resultant tree of fib(' + n + ')'
                    + '\n\n' +
                    'B) In which nodes (if any) was the repeating substructure property demonstated? In the case that there are none, answer -1.'

    return question
}

function getFibAnswer(){
    fib(n)

    if(repeatedSub.length === 0){
        repeatedSub = -1
    }

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    // console.log('Tree:', tree.root.serializeTree())
    // console.log('Repeated:', repeatedSub) //Nodes that were obtained through memoisation

    return [tree.root.serializeTree(), repeatedSub]
}

export { getFibQuestion, getFibAnswer }

//Ask Question
// console.log(getQuestion())
// console.log(getAnswer())