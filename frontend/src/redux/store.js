import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from './reducers/rootReducer'
import createSagaMiddleware from 'redux-saga'
import saga from './saga';

import { routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {authenticateUser} from '../utils/Auth'
export const history = createHistory()

const routesMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState={}

const  store = createStore( rootReducer,
                            defaultState,
                            composeEnhancers(applyMiddleware(routesMiddleware, sagaMiddleware)))                            
sagaMiddleware.run(saga);

//listen for jwt tokens 
store.subscribe(()=>authenticateUser(Object.assign(store.getState().user), store))

export default store;