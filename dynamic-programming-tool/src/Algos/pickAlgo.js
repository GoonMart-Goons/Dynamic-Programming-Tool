import { rng } from "../Classes/RNG.js";
//Implemented algos
import { GetCanSumQuestion, getCanSumAnswer, getCanSumDecomposedAnswer, GetCanSumDetails } from "./canSum.js";
import { GetFibQuestion, getFibAnswer, getFibDecomposedAnswer, GetFibDetails} from "./fibonacci.js";
import { GetLCSQuestion, getLCSAnswer, getLCSDecomposedAnswer, GetLCSDetails } from "./longestCommonSequence.js";
import { GetBestSumQuestion, getBestSumAnswer, getBestSumDecomposedAnswer, GetBestSumDetails } from "./bestSum.js";


let random = new rng(Date.now())
let question, answer, decomposedAnswer, details, chosenAlgo

/*  I M P L E M E N T E D   A L G O S
    0. Can Sum
    1. Fibonacci
    2. Longest Common Sequence
    3. Best Sum
*/

function getQuestion(){

    chosenAlgo = random.randomInt(3)
    // chosenAlgo = 3
    
    switch(chosenAlgo){
        case 0:
            question = GetCanSumQuestion()
            answer = getCanSumAnswer()
            decomposedAnswer = getCanSumDecomposedAnswer()                      
            break
        case 1:
            question = GetFibQuestion()
            answer = getFibAnswer()
            decomposedAnswer = getFibDecomposedAnswer()  
            break
        case 2:
            question = GetLCSQuestion()
            answer = getLCSAnswer()
            decomposedAnswer = getLCSDecomposedAnswer()  
            break                
        case 3:
            question = GetBestSumQuestion()
            answer = getBestSumAnswer()
            decomposedAnswer = getBestSumDecomposedAnswer()  
            break                
    }

    return question
}

function getAnswer(){
    return answer
}

function getDecomposedAnswer(){
    return decomposedAnswer
}

function GetDetails({number}){
    switch(number){
        case 0:
            details = GetCanSumDetails()
            break
        case 1:
            details = GetFibDetails()
            break
        case 2:

            details = GetLCSDetails()
            break                
        case 3:
            details = GetBestSumDetails()
            break                
    }
    return details
}

function getDetailNo(){
    return chosenAlgo
}

export { getQuestion, getAnswer, getDecomposedAnswer, GetDetails, getDetailNo }