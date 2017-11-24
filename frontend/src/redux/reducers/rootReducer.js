import { combineReducers } from 'redux';

import speller from './speller'
import question from './question'
import wordsAdmin from './wordsAdmin'
import spellingTest from './spellingTest'
import spellingTestAdmin from './spellingTestAdmin'
import assessmentAdmin from './assessmentAdmin'
import serviceMessage from './serviceMessage'

import { routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({   speller,
                                        spellingTest,
                                        wordsAdmin,
                                        spellingTestAdmin,
                                        assessmentAdmin,
                                        serviceMessage,
                                        question,
                                        router:routerReducer})

export default rootReducer;