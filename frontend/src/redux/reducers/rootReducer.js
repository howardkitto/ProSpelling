import { combineReducers } from 'redux';

import speller from './speller'
import question from './question'
import wordsAdmin from './wordsAdmin'

const rootReducer = combineReducers({   speller,
                                        wordsAdmin,
                                        question})

export default rootReducer;