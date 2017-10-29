import { combineReducers } from 'redux';

import speller from './speller'
import assessment from './assessment'
import wordsAdmin from './wordsAdmin'

const rootReducer = combineReducers({   speller,
                                        wordsAdmin,
                                        assessment})

export default rootReducer;