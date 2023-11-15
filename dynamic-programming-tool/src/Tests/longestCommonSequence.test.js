// longestCommonSubsequence.test.js
import { GetLCSQuestion, getLCSAnswer, GetLCSDetails } from "../Algos/longestCommonSequence";
import { Tree, TreeNode } from "../Classes/TreeClass";
import renderer from 'react-test-renderer';

describe("Longest Common Subsequence Question", () => {
  it("should generate a valid question", () => {
    const question = GetLCSQuestion();
    // Your assertion for the question content goes here
    expect(question).toBeDefined();
  });
});


describe("Longest Common Subsequence Answer", () => {
  it("should generate a valid answer", () => {
    const answer = getLCSAnswer();
    // Your assertion for the answer content goes here
    expect(answer).toHaveLength(2);
    expect(answer).toBeDefined();
  });
});

describe("Longest Common Subsequence Details", () => {
  it("should generate valid details", () => {
    const details = GetLCSDetails();
    // Your assertion for the details content goes here
    expect(details).toBeDefined();
  });
});

// Tree and TreeNode Classes Tests
describe("Tree and TreeNode Classes", () => {
  it("should create a valid tree structure for LCS", () => {
    const tree = new Tree("A,B,0");
    const node1 = new TreeNode("A,BC,1");
    const node2 = new TreeNode("AB,C,1");

    tree.insert(node1);
    tree.insert(node2);

    // Your assertions for the tree structure go here
    expect(tree.root.value).toBe("A,B,0");
    expect(tree.root.children.length).toBe(2);
    expect(tree.root.children[0].value).toBe("A,BC,1");
    expect(tree.root.children[1].value).toBe("AB,C,1");
  });

  it("should serialize the tree correctly for LCS", () => {
    const tree = new Tree("A,B,0");
    const node1 = new TreeNode("A,BC,1");
    const node2 = new TreeNode("AB,C,1");

    tree.insert(node1);
    tree.insert(node2);

    const serializedTree = tree.root.serializeTree();

    // Your assertions for the serialized tree go here
    expect(serializedTree).toBe("A,B,0(A,BC,1.AB,C,1)");
  });
});
