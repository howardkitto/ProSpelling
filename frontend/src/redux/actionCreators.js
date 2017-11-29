//action types

import uuid from 'uuid'

const SERVICE_MESSAGE = 'SERVICE_MESSAGE'
const CLEAR_SERVICE_MESSAGE = 'CLEAR_SERVICE_MESSAGE'
const ENV_TEST = 'ENV_TEST'

//USER EXPERIENCE ACTIONS

const START_SPELLING_TEST = 'START_SPELLING_TEST'
const GET_WORD = 'GET_WORD'
const GET_ANSWER = 'GET_ANSWER'
const GOT_ANSWER = 'GOT_ANSWER'
const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
const SAVE_PROGRESS = 'SAVE_PROGRESS'
const TRY_AGAIN = 'TRY_AGAIN'
const CHANGE_QUESTION_STATE = 'CHANGE_QUESTION_STATE'


// const CHANGE_SPELLING_TEST_STATE = 'CHANGE_SPELLING_TEST_STATE'

//WORDS ADMIN ACTIONS
const GET_WORDS_LIST = 'GET_WORDS_LIST'
const CREATE_WORD = 'CREATE_WORD'
const EDIT_WORD = 'EDIT_WORD'
const UPDATE_WORD = 'UPDATE_WORD'
const DELETE_WORD = 'DELETE_WORD'

//ASSESSMENT ADMIN ACTIONS
const GET_ASSESSMENTS = 'GET_ASSESSMENTS'
const GET_ASSESSMENT_BY_TITLE = 'GET_ASSESSMENT_BY_TITLE'
const GOT_ASSESSMENT_ID = 'GOT_ASSESSMENT_ID'
const CREATE_ASSESSMENT = 'CREATE_ASSESSMENT'
const EDIT_ASSESSMENT = 'EDIT_ASSESSMENT'
const UPDATE_ASSESSMENT = 'UPDATE_ASSESSMENT'
const DELETE_ASSESSMENT = 'DELETE_ASSESSMENT'

//spelling test admin
const GET_SPELLING_TESTS = 'GET_SPELLING_TESTS'

//Authentication

const CREATE_USER = 'CREATE_USER'
const CREATED_USER = 'CREATED_USER'
const LOGIN = 'LOGIN'
const LOGGEDIN = 'LOGGEDIN'
const REMOVE_TOKEN = 'REMOVE_TOKEN'

// USER EXPERIENCE

export function startSpellingTest(selection){
    console.log(selection.criteria + ' ' + selection.value)
    let timestamp = new Date()
    let spellingTestId = uuid()
    return {
        type: START_SPELLING_TEST,
        spellingTestId,
        criteria: selection.criteria,
        value: selection.value,
        assessment: selection.assessment,
        createdAt: timestamp
    }
}

export function getWord(criteria, value, spellingTest){
    // console.log('GET_WORD action '+JSON.stringify(spellingTest))
    return{
        type: GET_WORD,
        path: '../api/getword/criteria/'+criteria+'/value/'+value,
        method:'POST',
        payload:spellingTest,
        returnAction: 'GOT_WORD'
    }
}

export function tryAgain(){
    return{
        type: TRY_AGAIN
    }
}

export function submitAnswer(){
    return{
        type: SUBMIT_ANSWER
    }
}

export function saveProgress(question, nextState){
    return{
        type: SAVE_PROGRESS,
        question,
        nextState
    }}

export function changeQuestionState(questionState){
    // console.log('changeQuestionState got '+ questionState)
    return {
        type: CHANGE_QUESTION_STATE,
        questionState
    }
}

export function saveAnswer(answer){
    return {
        type: GET_ANSWER,
        answer
    }
}

export function gotAnswer(result, score){
    const timestamp = new Date()
    return{
        type: GOT_ANSWER,
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
        path: '../api/words/page/'+page+'/limit/'+limit,
        method: 'GET',
        returnAction: 'GOT_WORDS_LIST'
    }
}

export function createWord(word){
    // console.log('CREATE_WORD ' +JSON.stringify(word))
    return {
        type: CREATE_WORD,
        path: '../api/words',
        method: 'POST',
        payload: word,
        returnAction: 'CREATED_WORD'
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
        path:'../api/words',
        method:'PUT',
        payload: word,
        returnAction: 'UPDATED_WORD'
    }
}

export function deleteWord(word){
    // console.log('DELETE_WORD action '+JSON.stringify(word))
    return {
        type: DELETE_WORD,
        path:'../api/words',
        method:'DELETE',
        payload: word,
        returnAction: 'DELETED_WORD'
    }
}


//Assessment Admin

export function getAssessmentsList(page, limit){
    // console.log('GET_ASSESSMENTS' +JSON.stringify(assessment))
    return{
        type: GET_ASSESSMENTS,
        path: '../api/assessments/page/'+page+'/limit/'+limit,
        method: 'GET',
        returnAction: 'GOT_ASSESSMENTS'
    }
}

export function getAssessmentbyTitle(assessmentTitle){
console.log('GET_ASSESSMENT_BY_TITLE' + assessmentTitle)
    return{
        type:GET_ASSESSMENT_BY_TITLE,
        path:'../api/assessments/assessmentTitle/'+assessmentTitle,
        method:'GET',
        returnAction: GOT_ASSESSMENT_ID
}
}
export function createAssessment(assessment){
    // console.log('CREATE_ASSESSMENT' +JSON.stringify(assessment))
    return {
        type: CREATE_ASSESSMENT,
        path: '../api/assessments',
        method: 'POST',
        payload: assessment,
        returnAction: 'CREATED_ASSESSMENT'
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
        path: '../api/assessments',
        method: 'PUT',
        payload: assessment,
        returnAction: 'UPDATED_ASSESSMENT'
    }
}

export function deleteAssessment(assessment){
    // console.log('DELETE_ASSESSMENT action '+JSON.stringify(word))
    return {
        type: DELETE_ASSESSMENT,
        path: '../api/assessments',
        method:'DELETE',
        payload: assessment,
        returnAction: 'DELETED_ASSESSMENT'
    }
}

//SPELLING TEST ADMIN

export function getSpellingTests(page, limit){
    return{
        type: GET_SPELLING_TESTS,
        path:'../api/spellingTests/page/'+page+'/limit/'+limit,
        method:'GET',
        returnAction: 'GOT_SPELLING_TESTS'
    }
}

//Authentication

export const createUser=(user)=>{
    console.log('CREATE_USER action '+JSON.stringify(user))
    return{
        type:CREATE_USER,
        path:'./signup',
        method:'POST',
        payload:user,
        returnAction: CREATED_USER
    }
}

export const login=(user)=>{
    console.log('LOGIN action '+JSON.stringify(user))
    return{
        type:LOGIN,
        path:'./login',
        method:'POST',
        payload:user,
        returnAction: LOGGEDIN
    }
}

export const removeToken= ()=>{
    console.log('REMOVE_TOKEN called')
    return{
        type: REMOVE_TOKEN
    }
}

export const serviceMessage=(message)=>{
    console.log('service message - client side')
    return{
        type: SERVICE_MESSAGE,
        message

    }
}

export function envTest(){
    // console.log('ENV_TEST')
    return{
        type: ENV_TEST,
        path: '../api/envtest',
        method:'GET',
        returnAction: 'GOT_ENV'
    }
}

export function clearServiceMessage(context){
    return{
        type: CLEAR_SERVICE_MESSAGE,
        context
    }
}