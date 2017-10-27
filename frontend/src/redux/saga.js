import { all, call, put, takeEvery } from 'redux-saga/effects';

import getNextWordApi from './data/getNextWordApi'

//3. Workers

export function* getNextWord(){
    try{    
    const response = yield call(getNextWordApi)
    yield put({type:'GOT_NEXT_WORD', data: response})
    console.log(response)
    }
    catch(e){console.log('api error ' + e)}

}

//2. Watchers

export function* watchForGetNextWord(){
    yield takeEvery('GET_NEXT_WORD', getNextWord)
    
}

//1. Root Saga

export default function* saga(){
     
    yield all([
      watchForGetNextWord()
    ])
    }