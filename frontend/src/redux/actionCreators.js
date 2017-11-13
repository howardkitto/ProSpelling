//action types

import uuid from 'uuid'

// action creators

export function startSpellingTest(level){
    console.log('LEVEL_SELECTED ' + level)
    let timestamp = new Date()
    let spellingTestId = uuid()
    return {
        type: 'START_SPELLING_TEST',
        spellingTestId: spellingTestId,
        level: level,
        createdAt: timestamp
    }
}

export function changeSpellingTestState(spellingTestState){
    return{
        type: 'CHANGE_SPELLING_TEST_STATE',
        spellingTestState:spellingTestState
    }
}

export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name: name
    }
}

export function changeQuestionState(questionState){
    // console.log('changeQuestionState got '+ questionState)
    return {
        type: 'CHANGE_QUESTION_STATE',
        questionState: questionState
    }
}

export function saveAnswer(answer){
    return {
        type: 'GET_ANSWER',
        answer: answer
    }
}

export function gotAnswer(result, score){
    const timestamp = new Date()
    return{
        type: 'GOT_ANSWER',
        answerTimestamp: timestamp,
        result: result,
        score: score
    }
}

export function createWord(word){
    // console.log('CREATE_WORD ' +JSON.stringify(word))
    return {
        type: 'CREATE_WORD',
        word: word
    }
}

export function editWord(word){
    // console.log('EDIT_WORD' + JSON.stringify(word))
    return {
        type: 'EDIT_WORD',
        word: word
    }
}

export function updateWord(word){
    // console.log('UPDATE_WORD ' +JSON.stringify(word))
    return {
        type: 'UPDATE_WORD',
        word: word
    }
}

export function deleteWord(word){
    // console.log('DELETE_WORD action '+JSON.stringify(word))
    return {
        type: 'DELETE_WORD',
        word: word
    }
}

export function getWord(level, spellingTest){
    console.log('GET_WORD action '+JSON.stringify(spellingTest))
    return{
        type: 'GET_WORD',
        level: level,
        spellingTest: spellingTest
    }

}

export function getWordsList(){
    return{
        type: 'GET_WORDS_LIST'
    }
}

export function tryAgain(){
    return{
        type: 'TRY_AGAIN'
    }
}

export function submitAnswer(){
    return{
        type: 'SUBMIT_ANSWER'
    }
}

export function saveProgress(question, nextState){
    return{
        type: 'SAVE_PROGRESS',
        question:question,
        nextState: nextState
    }}

export function getSpellingTests(page, limit){
    return{
        type: 'GET_SPELLING_TESTS',
        page,
        limit


    }
}