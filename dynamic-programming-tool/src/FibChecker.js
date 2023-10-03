import React, { useEffect, useState } from 'react';

function FibChecker() {
  // Function to calculate Fibonacci values with memoization
  const calculateFibonacci = (n, memo) => {
    if (memo[n]) {
      return memo[n];
    }
    
    if (n <= 2) return 1;

    const result = calculateFibonacci(n - 1, memo) + calculateFibonacci(n - 2, memo);
    memo[n] = result;
    return result;
  };

  const n = 5;
  const [fibValue, setFibValue] = useState(null);

  useEffect(() => {
    const memo = {};
    const value = calculateFibonacci(n, memo);
    setFibValue(value);
  }, [n]);

  // Unique ID counter
  let nextNodeId = 0;

  // Function to generate the Fibonacci tree structure
  const generateFibonacciTree = (n, parentId = null) => {
    if (n <= 0) {
      return null;
    }

    const id = nextNodeId++;
    const node = {
      id,
      value: n === 1 || n === 2 ? 1 : null,
      parentId,
      children: [],
    };

    if (n > 2) {
      const leftChild = generateFibonacciTree(n - 1, id);
      const rightChild = generateFibonacciTree(n - 2, id);

      if (leftChild) {
        node.children.push(leftChild);
      }

      if (rightChild) {
        node.children.push(rightChild);

        if (node.children[0].value !== null && node.children[1].value !== null) {
          // Calculate the value of the current node
          node.value = node.children[0].value + node.children[1].value;
        }
      }
    }

    return node;
  };

  const fibonacciTree = generateFibonacciTree(n);

  // Function to render the tree structure in DFS traversal format as an array of arrays
const renderDFSAsArray = (node) => {
    const dfsArray = [];
    const dfs = (currentNode) => {
      const nodeInfo = `Node ${currentNode.id}: Value=${currentNode.value}, ParentID=${currentNode.parentId}`;
      dfsArray.push(nodeInfo);
      currentNode.children.forEach((child) => {
        dfs(child);
      });
    };
  
    dfs(node);
  
    return dfsArray;
  };
  

  return (
    <div>
  <h2>Question</h2>
  <p>Illustrate the tree diagram to find Fibonacci number {n}</p>
  {renderDFSAsArray(fibonacciTree).map((nodeInfo, index) => (
    <p key={index}>{nodeInfo}</p>
  ))}
</div>

  );
}

export default FibChecker;
