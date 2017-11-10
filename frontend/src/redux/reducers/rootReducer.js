import { combineReducers } from 'redux';

import speller from './speller'
import question from './question'
import wordsAdmin from './wordsAdmin'
import assessment from './assessment'
import assessmentAdmin from './assessmentAdmin'

const rootReducer = combineReducers({   speller,
                                        assessment,
                                        wordsAdmin,
                                        assessmentAdmin,
                                        question})

export default rootReducer;