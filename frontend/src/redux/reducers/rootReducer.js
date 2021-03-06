import { combineReducers } from 'redux';

import user from './user'
import currentQuestion from './currentQuestion'
import wordsAdmin from './wordsAdmin'
import usersAdmin from './usersAdmin'
import spellingTest from './spellingTest'
import spellingTestAdmin from './spellingTestAdmin'
import assessmentAdmin from './assessmentAdmin'
import serviceMessage from './serviceMessage'
import envProperties from './envProperties'
import familyAdmin from './familyAdmin'

import { routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({   serviceMessage,
                                        user,
                                        spellingTest,
                                        wordsAdmin,
                                        usersAdmin,
                                        spellingTestAdmin,
                                        assessmentAdmin,
                                        envProperties,
                                        currentQuestion,
                                        familyAdmin,

                                        router:routerReducer})

export default rootReducer;