import {createStore} from 'redux'
import speller from './reducers/speller'

const defaultState={}

//TO DO: combine reducers into a root reducer
const  store = createStore( speller,
                            defaultState,
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;