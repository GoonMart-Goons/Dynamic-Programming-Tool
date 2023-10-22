import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";

let tree, strings, ans
let myID = 0
let nodes = []
const random = new rng(Date.now())

function shuffleString(str){
    let arr = str.split('')
    let currIdx = str.length
    let temp

    while(currIdx !== 0){
        const randomIdx = random.randomInt(currIdx)
        currIdx -= 1

        temp = arr[currIdx]
        arr[currIdx] = arr[randomIdx]
        arr[randomIdx] = temp
    }

    return arr.join('')
}

function generateStrings(lenA, lenB, numMatching){
    let A = ''
    let B = ''
    let matching = ''

    //For picking random letters
    const min = 'A'.charCodeAt(0)
    const max = 'Z'.charCodeAt(0)

    //Generate matching letters
    for(var i = 0; i < numMatching; i++)
        matching += String.fromCharCode(random.randomRangeInt(min, max))

    //Generate missing letters for A and B
    for(var i = numMatching; i < lenA; i++)
        A += String.fromCharCode(random.randomRangeInt(min, max))
    for(var i = numMatching; i < lenB; i++)
        B += String.fromCharCode(random.randomRangeInt(min, max))

    A = matching + A
    B = matching + B
    //Shuffle the letters
    A = shuffleString(A)
    B = shuffleString(B)

    return {A, B}
}

function lcs(A, B, parentID = -1, memo = {}){
    const node = {
        A: A,
        B: B,
        value: undefined,
        pid: undefined,
        id: undefined,
    }
    node.pid = parentID
    node.id = myID
    myID++

    // Check if the result for this pair of strings is already memoized
    if(memo[A.length] && memo[A.length][B.length] !== undefined){
        node.value = memo[A.length][B.length]
        nodes.push(node)
        return memo[A.length][B.length]
    }

    //Base cases
    if(A.length === 0 || B.length === 0)
        node.value = 0
    else if(A[0] === B[0]) //1st chars match
        node.value = 1 + lcs(A.substring(1), B.substring(1), node.id, memo)
    else{
        const leftNode = lcs(A.substring(1), B, node.id, memo)
        const rightNode = lcs(A, B.substring(1), node.id, memo)
        node.value = Math.max(leftNode, rightNode)
    }

    if(!memo[A.length])
        memo[A.length] = []

    memo[A.length][B.length] = node.value //Memoize
    nodes.push(node)
    return node.value
}

function getLCSQuestion(){
    const lenA = random.randomRangeInt(1, 3)
    const lenB = random.randomRangeInt(1, 4)
    const numMatching = random.randomInt(3)
    strings = generateStrings(lenA, lenB, numMatching)
    nodes = []
    myID = 0

    let question = 'Using the Longest Common Subsequence algorithm, ' +
                   'construct the resultant tree of lcs("' + strings.A + '", "' + strings.B + '")'
    return question
}

function getLCSAnswer(){
    const ans = lcs(strings.A, strings.B)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    return tree.root.serializeTree()
}

export { getLCSQuestion, getLCSAnswer }