// fibonacci.test.js
import { GetFibQuestion, getFibAnswer, GetFibDetails } from "../Algos/fibonacci";
import { Tree, TreeNode } from "../Classes/TreeClass";

describe("Fibonacci Question", () => {
  it("should generate a valid question", () => {
    const question = GetFibQuestion();

    expect(question).toBeDefined();
  });
});

describe("Fibonacci Answer", () => {
  it("should generate a valid answer", () => {
    const answer = getFibAnswer();

    // Ensure that the answer is an array with two elements
    expect(Array.isArray(answer)).toBe(true);
    expect(answer).toHaveLength(2);
    // Validate tree structure format
    const [treeStructure, repeatingSubstructure] = answer;
    // Verify that the tree structure follows the expected format
    expect(typeof treeStructure).toBe("string");
    // Check that the repeating substructure is either an array or -1
    expect(Array.isArray(repeatingSubstructure) || repeatingSubstructure === -1).toBe(true);
  
  });
});

describe("Fibonacci Details", () => {
  it("should generate valid details", () => {
    const details = GetFibDetails();

    expect(details).toBeDefined();
  });
});

// Additional tests for TreeClass.js
describe("Tree and TreeNode Classes", () => {
  it("should create a valid tree structure", () => {
    const tree = new Tree(1);
    const node1 = new TreeNode(2);
    const node2 = new TreeNode(3);

    tree.insert(node1);
    tree.insert(node2);

    expect(tree.root.value).toBe(1);
    expect(tree.root.children.length).toBe(2);
    expect(tree.root.children[0].value).toBe(2);
    expect(tree.root.children[1].value).toBe(3);
  });

  it("should serialize the tree correctly", () => {
    const tree = new Tree(1);
    const node1 = new TreeNode(2);
    const node2 = new TreeNode(3);

    tree.insert(node1);
    tree.insert(node2);

    const serializedTree = tree.root.serializeTree();

    expect(serializedTree).toBe("1(2.3)");
  });
});
