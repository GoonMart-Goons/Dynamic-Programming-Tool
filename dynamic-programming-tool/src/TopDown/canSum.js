const canSum = (targetSum, numbers, memo = {}, nodes = [], level = 0, parentVal = null, parentLev = null) => {
    if (targetSum in memo){
        nodes.push([targetSum, level, true, parentVal, parentLev]);
        return [memo[targetSum], nodes];
    } 
    if (targetSum === 0){
        nodes.push([targetSum, level, true, parentVal, parentLev]);
        return [true, nodes];
    } 
    if (targetSum < 0) return [false, nodes];

    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSum(remainder, numbers, memo, nodes, level + 1, targetSum, level)[0]) {
            memo[targetSum] = true;
            nodes.push([targetSum, level, true, parentVal, parentLev]);
           
            return [true, nodes];
        }
    }

    memo[targetSum] = false;
    nodes.push([targetSum, level, false, parentVal, parentLev]);
    return [false, nodes];
};

//To run: npm canSum.js

/*console. log(canSum(7, [2, 3])); // true 
console. log(canSum(7, [5, 3, 4, 7])); // true 
console. log(canSum(7, [2, 4])); // false 
console. log(canSum(8, [2, 3, 5])); // true 
console. log(canSum(300, [7, 14])); //false*/


// QUESTION SKELETON

/*A function, canSum(targetSum, numbers), takes in targetSum and an array of numbers as arguments. 
The function returns a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.
Perform a tree like top-down trace of how this function should work on canSum(12, [2,4,5]).

Assumptions:

You may use an element of the array as many times as needed. 
You may assume that all input numbers are nonnegative.
Nodes are added to each level in the ordaer that they appear in the numbers array." */


// Function to perform depth-first traversal and represent each node in a sub-array
const depthFirstTraversal = (tree) => {
    const result = [];

    const dfs = (node) => {
        const [value, level, isTrue, parentVal, parentLev] = node;
        result.push([value, level, isTrue, parentVal, parentLev]);

        for (let i = 0; i < tree.length; i++) {
            const [childValue, childLevel, childIsTrue, childParentVal, childParentLev] = tree[i];

            if (
                (childParentVal === value && childParentLev === node[1]) ||
                (childValue === value && childLevel === node[1] + 1 && !childIsTrue)
            ) {
                dfs(tree[i]);
            }
        }
    };

    // Start the traversal from the root node
    dfs(tree[tree.length - 1]);

    return result;
};

// RANDOM NUMBER GENERATION
const seedrandom = require('seedrandom');

// Create a seeded random number generator
const seed = new Date().getTime(); // Replace with your desired seed
const rng = seedrandom(seed);

// Function to generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
}

// Generate a random integer between minValue and maxValue
const targetSum = getRandomInt(2, 10);
const numbersLength = getRandomInt(2, targetSum);
const numbers = [];

while (numbers.length < numbersLength) {
    const randomValue = getRandomInt(2, targetSum);

    // Check if the value is already in the array
    if (!numbers.includes(randomValue)) {
        numbers.push(randomValue);
    }
}

console.log("TS", targetSum);
console.log("NL", numbersLength);
console.log("numbers", numbers);

const [result, nodes] = canSum(targetSum, numbers);

console. log("result", result);

// Perform depth-first traversal on the tree-like structure
const dfsResult = depthFirstTraversal(nodes);

console.log(dfsResult);




// This is the DFS implementation with a mpre detailed output

// Function to perform depth-first traversal on the tree-like structure
/*const depthFirstTraversal = (tree) => {
    const result = [];
    const visited = new Set();

    const dfs = (node) => {
        if (visited.has(node)) {
            return;
        }
        visited.add(node);

        const [value, level, isTrue, parentVal, parentLev] = node;

        // Create a node object with relevant properties
        const nodeObj = {
            value,
            level,
            isTrue,
            parent: {
                value: parentVal,
                level: parentLev
            }
        };

        result.push(nodeObj);

        // Find child nodes
        for (let i = 0; i < tree.length; i++) {
            const [childValue, childLevel, childIsTrue, childParentVal, childParentLev] = tree[i];

            if (
                (childParentVal === value && childParentLev === level) ||
                (childValue === value && childLevel === level + 1 && !childIsTrue)
            ) {
                dfs(tree[i]);
            }
        }
    };

    // Start the traversal from the root node
    dfs(tree[tree.length - 1]);

    return result;
};*/