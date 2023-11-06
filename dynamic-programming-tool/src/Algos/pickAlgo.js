import { rng } from "../Classes/RNG.js";
//Implemented algos
import { getCanSumQuestion, getCanSumAnswer } from "./canSum.js";
import { getFibQuestion, getFibAnswer } from "./fibonacci.js";
import { getLCSQuestion, getLCSAnswer } from "./longestCommonSequence.js";
import { getBestSumQuestion, getBestSumAnswer } from "./bestSum.js";


let random = new rng(Date.now())
let question, answer

const chosenAlgo = 3
// const chosenAlgo = random.randomInt(3)
/*  I M P L E M E N T E D   A L G O S
    0. Can Sum
    1. Fibonacci
    2. Longest Common Sequence
*/

function getQuestion(){
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

export { getQuestion, getAnswer }