import { combineReducers } from 'redux';

import speller from './speller'
import question from './question'
import wordsAdmin from './wordsAdmin'
import assessment from './assessment'

const rootReducer = combineReducers({   speller,
                                        assessment,
                                        wordsAdmin,
                                        question})

export default rootReducer;