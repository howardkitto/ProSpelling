//Speller - a person who spells with a specified ability

function speller(state=[], action){
    // console.log('Reducer running')
    switch(action.type){
        case 'GET_SPELLER_NAME':
        // console.log('Reducer ' + JSON.stringify(action))
            return{
                name: action.name
            }
            default:
            return state;}
}

export default speller