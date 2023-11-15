// bestSum.test.js
import { GetBestSumQuestion, getBestSumAnswer, GetBestSumDetails, getBestSumDecomposedAnswer } from "../Algos/bestSum";

/*describe("bestSum", () => {
  it("should return the shortest combination of numbers that sum to the targetSum", () => {
    const targetSum = 10;
    const numbers = [1, 2, 5];

    const result = bestSum(targetSum, numbers);

    // The shortest combination is [2, 2, 2, 2, 2]
    expect(result).toEqual([2, 2, 2, 2, 2]);
  });

  it("should return -1 if no combination of numbers can sum to the targetSum", () => {
    const targetSum = 7;
    const numbers = [4, 5, 6];

    const result = bestSum(targetSum, numbers);

    // No combination of numbers can sum to 7
    expect(result).toBe(-1);
  });

  it("should memoize results for repeated subproblems", () => {
    const targetSum = 8;
    const numbers = [2, 3, 5];

    // Call bestSum twice with the same arguments
    const result1 = bestSum(targetSum, numbers);
    const result2 = bestSum(targetSum, numbers);

    // Both calls should return the same result without recalculating
    expect(result1).toEqual(result2);
  });
});*/

describe("Best Sum Question", () => {
  it("should generate a valid question", () => {
    const question = GetBestSumQuestion();
    
    // Assert the overall structure of the question
    expect(question.type).toBe("div");
    expect(question.props.children).toHaveLength(10); 

    // Assert the content of the second paragraph
    const secondParagraph = question.props.children[1];
    expect(secondParagraph.type).toBe("p");
    // Convert the children array to a string for matching
    const secondParagraphText = secondParagraph.props.children.join("");

    // Use toMatch with a regular expression
    expect(secondParagraphText).toContain("Using the bestSum algorithm, construct the resultant tree given:");
  });
});

describe("Best Sum Answer", () => {
  it("should generate a valid answer", () => {
    const answer = getBestSumAnswer();
    
    // Ensure that the answer is an array with three elements
    expect(Array.isArray(answer)).toBe(true);
    expect(answer).toHaveLength(3);
    
    // Validate tree structure format
    const [treeStructure, shortestCombination, repeatedSubstructure] = answer;
    
    // Verify that the tree structure follows the expected format
    expect(typeof treeStructure).toBe("string");
    
    // Check that the shortestCombination is either an array or -1
    expect(typeof shortestCombination === "string" || shortestCombination === -1).toBe(true);
    
    // Check that the repeatedSubstructure is either an array or -1
    expect(Array.isArray(repeatedSubstructure) || repeatedSubstructure === -1).toBe(true);
  });
});

describe("Best Sum Details", () => {
  it("should generate valid details", () => {
    const details = GetBestSumDetails();
    
    // Assert the overall structure of the details
    expect(details.type).toBe("div");
    expect(details.props.children).toHaveLength(3); 

    // Assert the content of the first paragraph
    const firstParagraph = details.props.children[1];
    expect(firstParagraph.type).toBe("p");
    // Convert the children array to a string for matching
    const firstParagraphText = firstParagraph.props.children
    
    // Use toMatch with a regular expression
    expect(firstParagraphText).toMatch(/This is the pseudocode for the bestSum algorithm:/);
  });
});

describe("getBestSumDecomposedAnswer", () => {
  it("should return a valid decomposed answer", () => {
    // Call the function to get the decomposed answer
    const decomposedAnswer = getBestSumDecomposedAnswer();
    
    expect(decomposedAnswer).toBeDefined();
  });
});
