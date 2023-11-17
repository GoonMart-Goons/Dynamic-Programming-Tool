import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import "../Styles/TopDown.css";

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


function GetBestSumQuestion(){
    //Reset global vars
    myID = 0
    nodes = []
    repeatedSub = []

    const random = new rng(2)

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

    let tempNumbers = numbers.join(',');

    /*let question = 'Using the bestSum algorithm, construct the resultant tree given:\n'
        + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers*/

    /*let question = 'A) Using the bestSum algorithm, construct the resultant tree given:\n'
                    + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers
                    + '\n\n' 
                    + 'B) What is the path of nodes that produce the shortest combination of the targetSum? ' + 
                    'In the case that a memoised node is used, use the id of the orignal node and not that of the repeated node. ' + 
                    'In the case that there is no shortest path, answer -1.'
                    // OR -> What is the smallest combination of values that produce the targetSum'
                    + '\n\n'
                    + 'C) In which nodes (if any) was the repeating substructure property demonstated? In the case that there are none, answer -1.'

    return question*/
    return (
        <div className="question-text">
          <br/>
          <p><strong>A)</strong> Using the bestSum algorithm, construct the resultant tree given:</p>
          <p>Target Sum = {targetSum} and the numbers list {tempNumbers} </p>
          <br/>
          <p><strong>B)</strong> What is the path of nodes that produce the shortest combination of the targetSum?</p>
          <p>Enter the answer as a comma separated list starting from the root e.g. 0,1,2,3</p>
          <p>In the case that a memoised node is used, use the id of the orignal node and not that of the repeated node.</p>
          <p>In the case that there is no shortest path, answer -1.</p>
          <br/>        
          <p><strong>C)</strong> In which nodes (if any) was the repeating substructure property demonstated? In the case that there are none, answer -1.</p>
          
        </div>
      );
}

function getBestSumAnswer(){    
    var out = bestSum(targetSum, numbers)
    if (out === null){
        out = -1
    }else{
        out = out.slice().reverse().toString()
    } 

    if(repeatedSub.length === 0){
        repeatedSub = -1
    }
    else repeatedSub.sort((a, b) => a - b)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    // console.log('Tree:', tree.root.serializeTree())
    // console.log('Shortest:', out) //Shortest path and smallest combination
    // console.log('Repeated:', repeatedSub) //Nodes that were obtained through memoisation
    return [tree.root.serializeTree(), out, repeatedSub]
}

function getBestSumDecomposedAnswer(){
    return tree.root.decomposeTree()
}

function GetBestSumDetails() {

    const customStyle = {
        backgroundColor: 'transparent' // Set the background color to transparent
      };

    const pseudocode = 
    `function buildTree(targetSum, numbers):
        create a root node with value targetSum
        add the root node to the tree
        
        for each num in numbers:
            if targetSum - num >= 0:
                Create child node with value targetSum - num
                Add child node as child of the root node
                Recursively call 
                buildTree(targetSum - num, numbers)

        return the root node of the tree
    `;
  
    return (
      <div className="question-text">
        <br/>
        <p>This is the pseudocode for the bestSum algorithm:</p>
        <SyntaxHighlighter language="python" style={docco} customStyle={customStyle}>
          {pseudocode}
        </SyntaxHighlighter>
      </div>
    );
  }

export { GetBestSumQuestion, getBestSumAnswer, getBestSumDecomposedAnswer, GetBestSumDetails }

// console.log('Shortest:', out) //Shortest path and smallest combination
// console.log('Repeated:', repeatedSub) //Nodes that were obtained through memoisation
// console.log('Nodes:', nodes) //All nodes in tree