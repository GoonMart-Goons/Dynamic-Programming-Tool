import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

let tree, n
let myID = 0
let nodes = []

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

    let question = 'Using the fibonacci algorithm, construct the resultant tree of fib(' + n + ')'

    return question
}

function getFibAnswer(){
    fib(n)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    return tree.root.serializeTree()
}

export { getFibQuestion, getFibAnswer }

//Ask Question
// console.log(getQuestion())
// console.log(getAnswer())