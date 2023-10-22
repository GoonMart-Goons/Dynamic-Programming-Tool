import { rng } from "../Classes/RNG.js";
//Implemented algos
import { getCanSumQuestion, getCanSumAnswer } from "./canSum.js";
import { getFibQuestion, getFibAnswer } from "./fibonacci.js";
import { getLCSQuestion, getLCSAnswer } from "./longestCommonSequence.js";


let random = new rng(Date.now())
let question, answer

const chosenAlgo = random.randomInt(2)
/*  I M P L E M E N T E D   A L G O S
    1. Can Sum
    2. Fibonacci
    3. Longest Common Sequence
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
    }

    return question
}

function getAnswer(){
    return answer
}

export { getQuestion, getAnswer }