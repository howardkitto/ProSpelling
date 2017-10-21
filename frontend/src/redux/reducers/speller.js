//Speller - a person who spells with a specified ability

function speller(state=[], action){
    console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GET_SPELLER_NAME':
            return{
                ...state,
                name: action.name
            }
        case 'GET_ANSWER':
            return{
                ...state,
                answer: action.answer
            }
            default:
            return state
        }
}



export default speller