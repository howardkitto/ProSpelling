import {createStore, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from './reducers/rootReducer'
import createSagaMiddleware from 'redux-saga'
import saga from './saga';


import { routerMiddleware} from 'react-router-redux'
export const history = createHistory()

const routesMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState={}

//TO DO: combine reducers into a root reducer
const  store = createStore( rootReducer,
                            defaultState,
                            composeEnhancers(applyMiddleware(sagaMiddleware, routesMiddleware))
)
                            

sagaMiddleware.run(saga);

export default store;