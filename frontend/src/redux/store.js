import {createStore, applyMiddleware, compose} from 'redux'
import speller from './reducers/speller'
import createSagaMiddleware from 'redux-saga'
import saga from './saga';
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState={}

//TO DO: combine reducers into a root reducer
const  store = createStore( speller,
                            defaultState,
                            composeEnhancers(applyMiddleware(sagaMiddleware))
)
                            

sagaMiddleware.run(saga);

export default store;