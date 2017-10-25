import {createStore, applyMiddleware} from 'redux'
import speller from './reducers/speller'
import createSagaMiddleware from 'redux-saga'
import saga from './saga';
const sagaMiddleware = createSagaMiddleware()

const defaultState={}

//TO DO: combine reducers into a root reducer
const  store = createStore( speller,
                            defaultState,
                            applyMiddleware(sagaMiddleware))
                            

sagaMiddleware.run(saga);

export default store;