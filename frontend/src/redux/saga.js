import { all, call, put, takeEvery } from 'redux-saga/effects';

import callAPI from './callApi'

//3. Worker

export function* callApiSaga(action){
    try{
        const response = yield call(callAPI, action)
        yield (!response.message)?   
        put({type:action.returnAction, data: response}):
        put({type:'API_MESSAGE', message:response.message})
    }
    catch(e){console.log('callApiSaga api error ' + e)}
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
                    'UPDATE_ASSESSMENT',
                    'DELETE_ASSESSMENT']

export function* watchForApiActions(){
    yield takeEvery(apiActions, callApiSaga)
}
//1. Root Saga

export default function* saga(){
     
    yield all([
        watchForApiActions()
    ])
    }