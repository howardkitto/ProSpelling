//Speller - a person who spells with a specified ability

function question(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
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
        case 'GOT_WORD':
        // console.log('reducer got ' + JSON.stringify(action))
            return{
            word: action.data.word,
            audioFileName: action.data.audioFileName,
            askTimeStamp: action.data.timeStamp,
            attempt: 1,
            questionState: 'wordLoaded'
            }
        case 'GOT_ANSWER':
        // console.log('reducer got ' + JSON.stringify(action))
            return{
                ...state,
                answerTimeStamp: action.answerTimestamp,
                result: action.result,
                score: action.score
            }
        case 'TRY_AGAIN':
        // console.log('here is the state  ' + JSON.stringify(state))
        return{
            word: state.word,
            audioFileName: state.audioFileName,
            attempt: state.attempt + 1,
            askTimeStamp:state.askTimeStamp,
            questionState: 'playing'
        }

        default:
        return state
        }
}

export default question