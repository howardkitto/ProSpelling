import { all, call, put, takeEvery } from 'redux-saga/effects';

import getNextWordApi from './data/getNextWordApi'
import getWordsListApi from './data/getWordsListApi'

//3. Workers

export function* getNextWord(){
    try{    
    const response = yield call(getNextWordApi)
    yield put({type:'GOT_NEXT_WORD', data: response})
    }
    catch(e){console.log('getNextWord api error ' + e)}
}

export function* getWordsList(){
    try{
        const response = yield call(getWordsListApi)
        yield put({type:'GOT_WORDS_LIST', data: response})
    }
    catch(e){console.log('getWordsList api error ' + e)}
}

//2. Watchers

export function* watchForGetNextWord(){
    yield takeEvery('GET_NEXT_WORD', getNextWord)
}

export function* watchForGetWordsList(){
    yield takeEvery('GET_WORDS_LIST', getWordsList)
}

//1. Root Saga

export default function* saga(){
     
    yield all([
      watchForGetNextWord(),
      watchForGetWordsList()
    ])
    }