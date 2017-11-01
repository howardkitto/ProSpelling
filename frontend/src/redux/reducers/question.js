//Speller - a person who spells with a specified ability

function question(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'LEVEL_SELECTED':
        return{
            ...state,
            level: action.level,
            questionState:'waitingforWord'
        }
        case 'CHANGE_QUESTION_STATE':
        return{
        ...state,
        questionState:action.questionState
        }
        case 'GET_ANSWER':
            return{
            ...state,
            answer: action.answer
            }
        case 'GOT_NEXT_WORD':
        // console.log('reducer got ' + JSON.stringify(action.word))
            return{
            ...state,
            word: action.word.word,
            audioFile: action.word.audioFileName,
            questionState: 'waitingForAudio'
            }
        default:
        return state
        }
}

export default question