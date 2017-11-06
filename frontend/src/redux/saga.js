import { all, call, put, takeEvery } from 'redux-saga/effects';

import getWordApi from './data/getWordApi'
import getWordsListApi from './data/getWordsListApi'
import postWordApi from './data/postWordApi'
import putWordApi from './data/putWordApi'
import deleteWordApi from './data/deleteWordApi'

//3. Workers

export function* getWord(action){
    try{    

    // console.log('saga sending ' + JSON.stringify(action))
    const response = yield call(getWordApi, action)
    // console.log('saga got ' + JSON.stringify(response))
    if(response){yield put({type:'GOT_WORD', word: response})}
    else{
    yield put({type:'ASSESSMENT_COMPLETE'})}
    }
    catch(e){console.log('getWord api error ' + e)}
}

export function* getWordsList(){
    try{
        const response = yield call(getWordsListApi)
        yield put({type:'GOT_WORDS_LIST', data: response})
    }
    catch(e){console.log('getWordsList api error ' + e)}
}

export function* postWord(action){
    try{    
    const response = yield call(postWordApi, action)

    yield (!response.message)?   
    put({type:'CREATED_WORD', data: response}):
    put({type:'FORM_ERROR', message:response.message})
    }
    catch(e){console.log('getWord api error ' + e)}
}

export function* putWord(action){
    try{
    const response = yield call(putWordApi, action)
    yield (!response.message)?   
        put({type:'UPDATED_WORD', data: response}):
        put({type:'FORM_ERROR', message:response.message})
    }
    // catch(e){console.log('updateWord API error ' + e)}
    catch(e){yield put({type:'FORM_ERROR', message:'API Error'})}
}

export function* deleteWord(action){
    try{
    // console.log('saga delete word got '+ JSON.stringify(action))    
    const response = yield call(deleteWordApi, action)
    yield put({type:'DELETED_WORD', data: response})
    }
    catch(e){console.log('deleteWord API error ' + e)}
}

//2. Watchers

export function* watchForGetWord(){
    yield takeEvery('GET_WORD', getWord)
}

export function* watchForGetWordsList(){
    yield takeEvery('GET_WORDS_LIST', getWordsList)
}

export function* watchForCreateWord(){
    yield takeEvery('CREATE_WORD', postWord)
}

export function* watchForUpdateWord(){
    yield takeEvery('UPDATE_WORD', putWord)
}

export function* watchForDeleteWord(){
    yield takeEvery('DELETE_WORD', deleteWord)
}
//1. Root Saga

export default function* saga(){
     
    yield all([
      watchForGetWord(),
      watchForGetWordsList(),
      watchForCreateWord(),
      watchForUpdateWord(),
      watchForDeleteWord()
      
    ])
    }