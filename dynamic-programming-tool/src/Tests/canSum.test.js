// canSum.test.js
import { GetCanSumQuestion, getCanSumAnswer, GetCanSumDetails, getCanSumDecomposedAnswer } from "../Algos/canSum";

/*describe("canSum", () => {
  it("should return true if the target sum can be achieved with the given numbers", () => {
    const targetSum = 10;
    const numbers = [2, 4, 6];

    const result = canSum(targetSum, numbers);

    // The target sum 10 can be achieved with numbers 2 and 4
    expect(result).toBe(true);
  });

  it("should return false if the target sum cannot be achieved with the given numbers", () => {
    const targetSum = 10;
    const numbers = [5, 7];

    const result = canSum(targetSum, numbers);

    // The target sum 10 cannot be achieved with the given numbers
    expect(result).toBe(false);
  });

  it("should memoize results for repeated subproblems", () => {
    const targetSum = 15;
    const numbers = [3, 5, 10];

    // Call canSum twice with the same arguments
    const result1 = canSum(targetSum, numbers);
    const result2 = canSum(targetSum, numbers);

    // Both calls should return the same result without recalculating
    expect(result1).toBe(result2);
  });
});*/

describe("Can Sum Question", () => {
  it("should generate a valid question", () => {
    const question = GetCanSumQuestion();
    
    // Assert the overall structure of the question
    expect(question.type).toBe("div");
    expect(question.props.children).toHaveLength(5); 

    // Assert the content of the second paragraph
    const secondParagraph = question.props.children[1];
    expect(secondParagraph.type).toBe("p");
    // Convert the children array to a string for matching
    const secondParagraphText = secondParagraph.props.children.join("");

    // Use toMatch with a regular expression
    expect(secondParagraphText).toContain("Using the canSum algorithm, construct the resultant tree given:");
  });
});

describe("Can Sum Answer", () => {
  it("should generate a valid answer", () => {
    const answer = getCanSumAnswer();
    
    // Ensure that the answer is an array with two elements
    expect(Array.isArray(answer)).toBe(true);
    expect(answer).toHaveLength(2);
    
    // Validate tree structure format
    const [treeStructure, canSumResult] = answer;
    
    // Verify that the tree structure follows the expected format
    expect(typeof treeStructure).toBe("string");
    
    // Check that the canSumResult is a boolean
    expect(typeof canSumResult).toBe("boolean");
  });
});

describe("Can Sum Details", () => {
  it("should generate valid details", () => {
    const details = GetCanSumDetails();
    
    // Assert the overall structure of the details
    expect(details.type).toBe("div");
    expect(details.props.children).toHaveLength(3); 

    // Assert the content of the first paragraph
    const firstParagraph = details.props.children[1];
    expect(firstParagraph.type).toBe("p");
    // Convert the children array to a string for matching
    const firstParagraphText = firstParagraph.props.children
    
    // Use toMatch with a regular expression
    expect(firstParagraphText).toMatch(/This is the pseudocode for the canSum algorithm:/);
  });
});

describe("getCanSumDecomposedAnswer", () => {
  it("should return a valid decomposed answer", () => {
    // Call the function to get the decomposed answer
    const decomposedAnswer = getCanSumDecomposedAnswer();
    
    expect(decomposedAnswer).toBeDefined();
  });
});
