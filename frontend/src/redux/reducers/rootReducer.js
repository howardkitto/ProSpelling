import { combineReducers } from 'redux';

import speller from './speller'
import assessment from './assessment'
import words from './words'

const rootReducer = combineReducers({   speller,
                                        words,
                                        assessment})

export default rootReducer;