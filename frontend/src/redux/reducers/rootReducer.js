import { combineReducers } from 'redux';

import user from './user'
import question from './question'
import wordsAdmin from './wordsAdmin'
import usersAdmin from './usersAdmin'
import spellingTest from './spellingTest'
import spellingTestAdmin from './spellingTestAdmin'
import assessmentAdmin from './assessmentAdmin'
import serviceMessage from './serviceMessage'

import { routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({   serviceMessage,
                                        user,
                                        spellingTest,
                                        wordsAdmin,
                                        usersAdmin,
                                        spellingTestAdmin,
                                        assessmentAdmin,
                                        question,
                                        router:routerReducer})

export default rootReducer;