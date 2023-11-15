// fibonacci.test.js
import { GetFibQuestion, getFibAnswer, GetFibDetails, getFibDecomposedAnswer} from "../Algos/fibonacci";

describe("Fibonacci Question", () => {
  it("should generate a valid question", () => {
    const question = GetFibQuestion();

    expect(question).toBeDefined();
    // Assert the overall structure of the question
     expect(question.type).toBe("div");
     expect(question.props.children).toHaveLength(4); 

     // Assert the content of the first paragraph
     const firstParagraph = question.props.children[1];
     expect(firstParagraph.type).toBe("p");
     // Convert the children array to a string for matching
    const firstParagraphText = firstParagraph.props.children.join("");

    // Use toMatch with a regular expression
    expect(firstParagraphText).toMatch(/Using.*fibonacci.*construct.*resultant.*tree.*of/);

     // Assert the content of the third paragraph
     const thirdParagraph = question.props.children[3];
     expect(thirdParagraph.type).toBe("p");
     const thirdParagraphText = thirdParagraph.props.children.join("");

    // Use toMatch with a regular expression
    expect(thirdParagraphText).toMatch(/In.*which.*nodes/);
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

    // Assert the overall structure of the details
    expect(details.type).toBe("div");
    expect(details.props.children).toHaveLength(3); 

    // Assert the content of the first paragraph
    const firstParagraph = details.props.children[1];
    expect(firstParagraph.type).toBe("p");
    // Convert the children array to a string for matching
    const firstParagraphText = firstParagraph.props.children

    // Use toMatch with a regular expression
    expect(firstParagraphText).toMatch(/This is the pseudocode for the Fibonacci algorithm:/);
  });
});

describe("getFibDecomposedAnswer", () => {
    it("should return a valid decomposed answer", () => {
  
      // Call the function to get the decomposed answer
      const decomposedAnswer = getFibDecomposedAnswer();
  
      expect(decomposedAnswer).toBeDefined();
    });
  });