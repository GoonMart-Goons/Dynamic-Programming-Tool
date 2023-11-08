import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "../Styles/TopDown.css";

let tree, strings, ans
let myID = 0
let nodes, repeatedSub = []
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
        repeatedSub.push(node.id)
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
    repeatedSub = []
    myID = 0

    let question = 'A) Using the Longest Common Subsequence algorithm, ' +
                   'construct the resultant tree of lcs("' + strings.A + '", "' + strings.B + '")' + 
                   '\n\n' +
                   'B) In which nodes (if any) was the repeating substructure property demonstated? In the case that there are none, answer -1.'
    
    return question
}

function getLCSAnswer(){
    const ans = lcs(strings.A, strings.B)

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

function GetLCSDetails() {

    const customStyle = {
        backgroundColor: 'transparent' // Set the background color to transparent
      };

    const pseudocode = 
    `function lcs(A, B, memo):
        if A or B is empty:
            return 0

        if A[0] equals B[0]:
            result = 1 + lcs(A[1:], B[1:], memo)
        else:
            leftResult = lcs(A[1:], B, memo)
            rightResult = lcs(A, B[1:], memo)
            result = max(leftResult, rightResult)

        memo[A][B] = result
        return result
    `;
  
    return (
      <div className="question-text">
        <br/>
        <p>This is an example of the LCS algorithm:</p>
        <SyntaxHighlighter language="python" style={docco} customStyle={customStyle}>
          {pseudocode}
        </SyntaxHighlighter>
      </div>
    );
}

export { getLCSQuestion, getLCSAnswer, GetLCSDetails }