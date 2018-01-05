import { all, call, put, takeEvery } from 'redux-saga/effects';

import callAPI from './callApi'

//3. Worker

export function* callApiSaga(action){
    try{
        const response = yield call(callAPI, action)
        console.log("saga got " + JSON.stringify(response))
        yield (!response.errors)?
        put({type:action.returnAction, data: response}):
        put({type:'SERVICE_MESSAGE', message:response})
    }
    catch(e){put({type:'SERVICE_MESSAGE', message:'Problem Contacting Server'})}
}

//2. Watcher

const apiActions = ['GET_WORD',
                    'GET_WORDS_LIST',
                    'CREATE_WORD',
                    'UPDATE_WORD',
                    'DELETE_WORD',
                    'GET_SPELLING_TESTS',
                    'CREATE_ASSESSMENT',
                    'GET_ASSESSMENTS',
                    'GET_ASSESSMENT_BY_TITLE',
                    'UPDATE_ASSESSMENT',
                    'DELETE_ASSESSMENT',
                    'CREATE_USER',
                    'LOGIN',
                    'ENV_TEST',
                    'GET_USERS_LIST']

export function* watchForApiActions(){
    yield takeEvery(apiActions, callApiSaga)
}
//1. Root Saga

export default function* saga(){
     
    yield all([
        watchForApiActions()
    ])
    }