import { rng } from "../Classes/RNG.js";
//Implemented algos
import { getCanSumQuestion, getCanSumAnswer, GetCanSumDetails } from "./canSum.js";
import { getFibQuestion, getFibAnswer, GetFibDetails} from "./fibonacci.js";
import { getLCSQuestion, getLCSAnswer, GetLCSDetails } from "./longestCommonSequence.js";
import { getBestSumQuestion, getBestSumAnswer, GetBestSumDetails } from "./bestSum.js";


let random = new rng(Date.now())
let question, answer, details, chosenAlgo

/*  I M P L E M E N T E D   A L G O S
    0. Can Sum
    1. Fibonacci
    2. Longest Common Sequence
    3. Best Sum
*/

function getQuestion(){

    chosenAlgo = random.randomInt(3)
    
    switch(chosenAlgo){
        case 0:
            question = getCanSumQuestion()
            answer = getCanSumAnswer()
            break
        case 1:
            question = getFibQuestion()
            answer = getFibAnswer()
            break
        case 2:
            question = getLCSQuestion()
            answer = getLCSAnswer()
            break                
        case 3:
            question = getBestSumQuestion()
            answer = getBestSumAnswer()
            break                
    }

    return question
}

function getAnswer(){
    return answer
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

export { getQuestion, getAnswer, GetDetails, getDetailNo }