//action types

import uuid from 'uuid'

const SERVICE_MESSAGE = 'SERVICE_MESSAGE'
const CLEAR_SERVICE_MESSAGE = 'CLEAR_SERVICE_MESSAGE'
const ENV_TEST = 'ENV_TEST'

//USER EXPERIENCE ACTIONS
const RESET_SPELLING_TEST = 'RESET_SPELLING_TEST'
const GET_ASSESSMENT = 'GET_ASSESSMENT'
const GOT_ASSESSMENT = 'GOT_ASSESSMENT'
const SET_UP_SPELLING_TEST = 'SET_UP_SPELLING_TEST'
const START_SPELLING_TEST = 'START_SPELLING_TEST'
const SPEECH_SUPPORTED = 'SPEECH_SUPPORTED'
const GET_WORD = 'GET_WORD'
const GET_ANSWER = 'GET_ANSWER'
const GOT_ANSWER = 'GOT_ANSWER'
const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
const SAVE_PROGRESS = 'SAVE_PROGRESS'
const TRY_AGAIN = 'TRY_AGAIN'
const CHANGE_QUESTION_STATE = 'CHANGE_QUESTION_STATE'
const SPELLING_TEST_COMPLETE = 'SPELLING_TEST_COMPLETE'
const TOGGLE_SPEECH_TEXT = 'TOGGLE_SPEECH_TEXT'



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

//PATTERN ADMIN ACTIONS
const GET_PATTERNS = 'GET_PATTERNS'
const CREATE_PATTERN = 'CREATE_PATTERN'
const EDIT_PATTERN = 'EDIT_PATTERN'
const UPDATE_PATTERN = 'UPDATE_PATTERN'
const DELETE_PATTERN = 'DELETE_PATTERN'

//spelling test admin
const GET_SPELLING_TESTS = 'GET_SPELLING_TESTS'

//Authentication

const CREATE_USER = 'CREATE_USER'
const CREATED_USER = 'CREATED_USER'
const LOGIN = 'LOGIN'
const LOGGEDIN = 'LOGGEDIN'
const SYNCH_USER = 'SYNCH_USER'
const LOG_OUT = 'LOG_OUT'

//User Admin

const GET_USERS_LIST = 'GET_USERS_LIST'
const EDIT_USER = 'EDIT_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const GET_USER_TESTS = 'GET_USER_TESTS'

// USER EXPERIENCE

export function speechSupported(value){
    return{
    type: SPEECH_SUPPORTED,
    speechSupported: value
}}

export const resetSpellingTest= ()=>{
    return{
        type: RESET_SPELLING_TEST
    }
}

export function setUpSpellingTest(selection, userId){
    // console.log(selection.criteria + ' ' + selection.value)
    let timestamp = new Date()
    let spellingTestId = uuid()
    return {
        type: SET_UP_SPELLING_TEST,
        spellingTestId,
        criteria: selection.criteria,
        value: selection.value,
        assessment: selection.assessment,
        createdAt: timestamp,
        userId
    }
}

export function startSpellingTest(){
    return{
    type: START_SPELLING_TEST
}}

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

export function saveProgress(question, userId, nextState){
    // console.log('saveProgress action got '+ JSON.stringify(question) +' '+userId+' '+nextState)
    return{
        type: SAVE_PROGRESS,
        question,
        nextState,
        userId 
    }}

export function changeQuestionState(questionState){
    // console.log('changeQuestionState got '+ questionState)
    return {
        type: CHANGE_QUESTION_STATE,
        questionState
    }
}


export function spellingTestComplete(){
    // console.log('spellingTestComplete')
    return {
        type: SPELLING_TEST_COMPLETE
    }
}

export const toggleSpeechText = (value)=>{
    return {
        type: TOGGLE_SPEECH_TEXT,
        useSpeech: value
    }
}



export function saveAnswer(answer){
    return {
        type: GET_ANSWER,
        answer
    }
}

export function gotAnswer(result){
    // console.log('gotAnswer got '+ JSON.stringify(result))
    const timestamp = new Date()
    return{
        type: GOT_ANSWER,
        answerTimestamp: timestamp,
        ...result
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

export const getAssessmentbyTitle = (assessmentTitle) =>{
// console.log('GET_ASSESSMENT_BY_TITLE' + assessmentTitle)
    return{
        type:GET_ASSESSMENT,
        path:'../api/assessments/assessmentTitle/'+assessmentTitle,
        method:'GET',
        returnAction: GOT_ASSESSMENT
    }
}

export const getAssessmentbyId = (assessmentId) =>{
    // console.log('GET_ASSESSMENT_BY_TITLE' + assessmentTitle)
        return{
            type:GET_ASSESSMENT,
            path:'../api/assessments/assessmentId/'+assessmentId,
            method:'GET',
            returnAction: GOT_ASSESSMENT
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

//PATTERN ACTIONS
export function getPatternsList(page, limit){
    // console.log('GET_PATTERNS')
    return{
        type: GET_PATTERNS,
        path: '../api/families/page/'+page+'/limit/'+limit,
        method: 'GET',
        returnAction: 'GOT_PATTERNS'
    }
}

export function createPattern(pattern){
    console.log('CREATE_PATTERN' +JSON.stringify(pattern))
    return {
        type: CREATE_PATTERN,
        path: '../api/families',
        method: 'POST',
        payload: pattern,
        returnAction: 'CREATED_PATTERN'
    }
}

export function editPattern(pattern){
    // console.log('EDIT_PATTERN ACTION' + JSON.stringify(pattern))
    return {
        type: EDIT_PATTERN,
        pattern
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
    // console.log('CREATE_USER action '+JSON.stringify(user))
    return{
        type:CREATE_USER,
        path:'./signup',
        method:'POST',
        payload:user,
        returnAction: CREATED_USER
    }
}


export const login=(user)=>{
    // console.log('LOGIN action '+JSON.stringify(user))
    return{
        type:LOGIN,
        path:'./login',
        method:'POST',
        payload:user,
        returnAction: LOGGEDIN
    }
}

export const serviceMessage=(message)=>{
    // console.log('service message - client side')
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

export function synchUser(user){
    // console.log('synchUser ' +JSON.stringify(user))
    return{
        type:SYNCH_USER,
        user
    }
}

export function logOut(){
    return{
        type: LOG_OUT
    }
}

//USER ADMIN

export function getUsersList(page, limit){
    return{
        type: GET_USERS_LIST,
        path: '../api/users/page/'+page+'/limit/'+limit,
        method: 'GET',
        returnAction: 'GOT_USERS_LIST'
    }
}

export function editUser(user){
    // console.log('EDIT_USER' + JSON.stringify(user))
    return {
        type: EDIT_USER,
        user
    }
}

export function updateUser(user){
    // console.log('UPDATE_WORD ' +JSON.stringify(user))
    return {
        type: UPDATE_USER,
        path:'../api/users',
        method:'PUT',
        payload: user,
        returnAction: 'UPDATED_USER'
    }
}


export function deleteUser(user){
    // console.log('DELETE_USER action '+JSON.stringify(user))
    return {
        type: DELETE_USER,
        path:'../api/user',
        method:'DELETE',
        payload: user,
        returnAction: 'DELETED_USER'
    }
}

export const getUserTests = (userId, page, limit)=>{
    // console.log('GET_USER_TESTS ' +userId)
    return {
        type: GET_USER_TESTS,
        path:'../../api/spellingTests/user/'+userId+'/page/'+page+'/limit/'+limit,
        method:'GET',
        returnAction: 'GOT_USER_TESTS'
    }
}

