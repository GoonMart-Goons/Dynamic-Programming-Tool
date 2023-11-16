import { getQuestion, getAnswer, getDecomposedAnswer, GetDetails, getDetailNo } from "./pickAlgo";

test('Test getQuestion is not null', () => {
    //Run 1000 times so all 4 algos get called at least once
    for(var i = 0; i < 1000; i++){
        const question = getQuestion()    
        expect(question).not.toBeNull()
    }
})

test('Test getAnswer is not null', () => {
    const question = getQuestion()
    const answer = getAnswer()

    expect(answer).not.toBeNull()
})

test('Test getDecomposedAnswer is not null', () => {
    const question = getQuestion()
    const answer = getAnswer()
    const decomposedAnswer = getDecomposedAnswer()

    expect(decomposedAnswer).not.toBeNull()
})

test('Test getDetails is not null for all 4 algos', () => {
    var testedAlgos = new Set()
    while(testedAlgos.length < 4){
        getQuestion()
        if(testedAlgos.has(getDetailNo))
            continue
        else{
            const details = GetDetails(getDetailNo)
            expect(details).not.toBeNull()
        }
    }
})

test('Test getDetailsNo is in range [0, 3]', () => {
    for(var i = 0; i < 1000; i++){
        getQuestion()
        const chosenAlgo = getDetailNo()
        expect(chosenAlgo).toBeGreaterThanOrEqual(0)
        expect(chosenAlgo).toBeLessThanOrEqual(3)
    }
})