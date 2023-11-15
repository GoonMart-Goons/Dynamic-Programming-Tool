import { Tree, TreeNode } from "../Classes/TreeClass.js";
import { rng } from "../Classes/RNG.js";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import "../Styles/TopDown.css";

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
            //return false
            continue
        }
        else if (canSum(remainder, numbers, node.id, memo) === true){
            memo[targetSum] = true
            return true
        }
    }

    memo[targetSum] = false
    return false
}

function GetCanSumQuestion(){
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
    let tempNumbers = numbers.join(',');

    /*let question = 'A) Using the canSum algorithm, construct the resultant tree given:\n'
        + 'Target Sum = ' + targetSum + ' and the numbers list ' + numbers +
        '\n\n' +
        'B) Is it possible to sum to the target sum using the given numbers list? true/false'

    return question*/

    return (
        <div className="question-text">
          <br/>
          <p><strong>A)</strong> Using the canSum algorithm, construct the resultant tree given:</p>
          <p>Target Sum = {targetSum} and the numbers list {tempNumbers} </p>
          <br/>
          <p><strong>B)</strong> Is it possible to sum to the target sum using the given numbers list? true/false</p>
        </div>
      );
}

function getCanSumAnswer(){
    const val = canSum(targetSum, numbers)

    nodes.sort((a, b) => a.id - b.id)
    tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    // console.log('Tree:', tree.root.serializeTree())
    // console.log('Boolean:', val)

    return [tree.root.serializeTree(), val]
}

function getCanSumDecomposedAnswer(){
    return tree.root.decomposeTree()
}

function GetCanSumDetails() {

    const customStyle = {
        backgroundColor: 'transparent' // Set the background color to transparent
      };

    const pseudocode = 
    `function canSum(targetSum, numbers, memo):
        if targetSum in memo:
            return memo[targetSum]

        if targetSum is 0:
            return true

        for each num in numbers:
            remainder = targetSum - num
            if remainder < 0:
                continue
            if canSum(remainder, numbers, memo) is true:
                memo[targetSum] = true
                return true

        memo[targetSum] = false
        return false
    `;
  
    return (
      <div className="question-text">
        <br/>
        <p>This is the pseudocode for the canSum algorithm:</p>
        <SyntaxHighlighter language="python" style={docco} customStyle={customStyle}>
          {pseudocode}
        </SyntaxHighlighter>
      </div>
    );
  }

export { GetCanSumQuestion, getCanSumAnswer, getCanSumDecomposedAnswer, GetCanSumDetails }