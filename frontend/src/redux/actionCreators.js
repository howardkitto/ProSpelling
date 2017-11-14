//action types

import uuid from 'uuid'

//USER EXPERIENCE ACTIONS

const START_SPELLING_TEST = 'START_SPELLING_TEST'
// const CHANGE_SPELLING_TEST_STATE = 'CHANGE_SPELLING_TEST_STATE'

//WORDS ADMIN ACTIONS
const GET_WORDS_LIST = 'GET_WORDS_LIST'
const CREATE_WORD = 'CREATE_WORD'
const EDIT_WORD = 'EDIT_WORD'
const UPDATE_WORD = 'UPDATE_WORD'
const DELETE_WORD = 'DELETE_WORD'

//ASSESSMENT ADMIN ACTIONS
const GET_ASSESSMENTS = 'GET_ASSESSMENTS'
const CREATE_ASSESSMENT = 'CREATE_ASSESSMENT'
const EDIT_ASSESSMENT = 'EDIT_ASSESSMENT'
const UPDATE_ASSESSMENT = 'UPDATE_ASSESSMENT'
const DELETE_ASSESSMENT = 'DELETE_ASSESSMENT'

//spelling test admin
const GET_SPELLING_TESTS = 'GET_SPELLING_TESTS'

// USER EXPERIENCE

export function startSpellingTest(level){
    // console.log('LEVEL_SELECTED ' + level)
    let timestamp = new Date()
    let spellingTestId = uuid()
    return {
        type: START_SPELLING_TEST,
        spellingTestId,
        level,
        createdAt: timestamp
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

export function changeQuestionState(questionState){
    // console.log('changeQuestionState got '+ questionState)
    return {
        type: 'CHANGE_QUESTION_STATE',
        questionState
    }
}

export function saveAnswer(answer){
    return {
        type: 'GET_ANSWER',
        answer
    }
}

export function gotAnswer(result, score){
    const timestamp = new Date()
    return{
        type: 'GOT_ANSWER',
        answerTimestamp: timestamp,
        result,
        score
    }
}

//USER

export function saveName(name){
    return {
        type: 'GET_SPELLER_NAME',
        name
    }
}

//Words Admin

export function getWordsList(page, limit){
    return{
        type: GET_WORDS_LIST,
        page,
        limit
    }
}

export function createWord(word){
    // console.log('CREATE_WORD ' +JSON.stringify(word))
    return {
        type: CREATE_WORD,
        word
    }
}

export function editWord(word){
    // console.log('EDIT_WORD' + JSON.stringify(word))
    return {
        type: EDIT_WORD,
        word
    }
}

export function updateWord(word){
    // console.log('UPDATE_WORD ' +JSON.stringify(word))
    return {
        type: UPDATE_WORD,
        word
    }
}

export function deleteWord(word){
    // console.log('DELETE_WORD action '+JSON.stringify(word))
    return {
        type: DELETE_WORD,
        word
    }
}


//Assessment Admin

export function getAssessmentsList(page, limit){
    // console.log('GET_ASSESSMENTS' +JSON.stringify(assessment))
    return{
        type: GET_ASSESSMENTS,
        page,
        limit
    }
}

export function createAssessment(assessment){
    // console.log('CREATE_ASSESSMENT' +JSON.stringify(assessment))
    return {
        type: CREATE_ASSESSMENT,
        assessment
    }
}

export function editAssessment(assessment){
    // console.log('EDIT_ASSESSMENT' + JSON.stringify(assessment))
    return {
        type: EDIT_ASSESSMENT,
        assessment
    }
}

export function updateAssessment(assessment){
    // console.log('UPDATE_WORD ' +JSON.stringify(word))
    return {
        type: UPDATE_ASSESSMENT,
        assessment
    }
}

export function deleteAssessment(assessment){
    // console.log('DELETE_ASSESSMENT action '+JSON.stringify(word))
    return {
        type: DELETE_ASSESSMENT,
        assessment
    }
}

//SPELLING TEST ADMIN

export function getSpellingTests(page, limit){
    return{
        type: GET_SPELLING_TESTS,
        page,
        limit
    }
}





//Think this is redundant
// export function changeSpellingTestState(spellingTestState){
//     return{
//         type: CHANGE_SPELLING_TEST_STATE,
//         spellingTestState
//     }
// }