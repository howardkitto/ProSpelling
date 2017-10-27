//Speller - a person who spells with a specified ability

function speller(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GET_ANSWER':
            return{
                ...state,
                answer: action.answer
            }
        case 'GOT_NEXT_WORD':
            return{
                ...state,
                nextWord: action.data.word
            }
            default:
            return state
        }
}



export default speller