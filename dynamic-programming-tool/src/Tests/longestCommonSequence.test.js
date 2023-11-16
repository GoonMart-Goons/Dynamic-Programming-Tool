// longestCommonSubsequence.test.js
import { GetLCSQuestion, getLCSAnswer, GetLCSDetails, getLCSDecomposedAnswer, shuffleString, generateStrings, lcs} from "../Algos/longestCommonSequence";

describe("shuffleString", () => {
  it("should shuffle the characters in a string", () => {
    const inputString = "ABC";
    const shuffledString = shuffleString(inputString);

    // Check that the length remains the same
    expect(shuffledString.length).toBe(inputString.length);

    // Check that the characters are the same, but in a different order
    expect([...inputString].every(char => shuffledString.includes(char))).toBe(true);
  });
});

describe("generateStrings", () => {
  it("should generate strings with the specified lengths and matching characters", () => {
    const lenA = 3;
    const lenB = 4;
    const numMatching = 2;

    const { A, B } = generateStrings(lenA, lenB, numMatching);

    // Check that the lengths are correct
    expect(A.length).toBe(lenA);
    expect(B.length).toBe(lenB);

    // Check that the number of matching characters is equal to 'numMatching'
    Set.prototype.intersection = function (set) {
      const result = new Set();
      for (const value of set) {
          if (this.has(value)) {
              result.add(value);
          }
      }
      return result;
  };
  
    const matchingCount = new Set(A).intersection(new Set(B)).size;

    expect(matchingCount).toBe(numMatching);

  });
});

function lcsWrapper(A, B) {
  const nodes = [];
  const repeatedSub = [];

  function wrapper(...args) {
      const result = lcs(...args);
      return result;
  }

  return wrapper;
}

describe("lcs", () => {
  it("should return the length of the longest common subsequence", () => {
    const A = "ABCBDAB";
    const B = "BDCAB";

    const lengthOfLCS = lcsWrapper(A, B);

    // The longest common subsequence is "BCAB" with a length of 4
    expect(lengthOfLCS).toBe(4);
  });
});




describe("Longest Common Subsequence Question", () => {
  it("should generate a valid question", () => {
    const question = GetLCSQuestion();
    // Your assertion for the question content goes here
    expect(question).toBeDefined();

     // Assert the overall structure of the question
     expect(question.type).toBe("div");
     expect(question.props.children).toHaveLength(7); 

     // Assert the content of the first paragraph
     const firstParagraph = question.props.children[1];
     expect(firstParagraph.type).toBe("p");
     // Convert the children array to a string for matching
    const firstParagraphText = firstParagraph.props.children.join("");

    // Use toMatch with a regular expression
    expect(firstParagraphText).toMatch(/Using.*Longest.*Subsequence.*construct.*resultant.*tree.*of/);

     // Assert the content of the third paragraph
     const thirdParagraph = question.props.children[4];
     expect(thirdParagraph.type).toBe("p");
     expect(thirdParagraph.props.children).toContain("When you have reached the end of a string, input nothing for that substring, e.g. \"AB,,0\"");
 
  });
});

describe("Longest Common Subsequence Answer", () => {
  it("should generate a valid answer", () => {
    const answer = getLCSAnswer();
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

describe("Longest Common Subsequence Details", () => {
  it("should generate valid details", () => {
    const details = GetLCSDetails();
    // Your assertion for the details content goes here
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
    expect(firstParagraphText).toMatch(/This is an example of the LCS algorithm:/);

  });
});


describe("getLCSDecomposedAnswer", () => {
  it("should return a valid decomposed answer", () => {

    // Call the function to get the decomposed answer
    const decomposedAnswer = getLCSDecomposedAnswer();

    expect(decomposedAnswer).toBeDefined();
  });
});