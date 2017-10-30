//Speller - a person who spells with a specified ability

function speller(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'LEVEL_SELECTED':
        return{
            ...state,
            level: action.level
        }
        case 'GET_ANSWER':
            return{
            ...state,
            answer: action.answer
            }
        case 'GOT_NEXT_WORD':
        console.log('reducer got ' + JSON.stringify(action.word))
            return{
            ...state,
            nextWord: action.word.word,
            audioFile: action.word.audioFileName
            }
        default:
        return state
        }
}



export default speller