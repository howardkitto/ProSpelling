//Speller - a person who spells with a specified ability

function user(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'CREATED_USER':
        console.log('User Reducer running' + JSON.stringify(action))
            return{
                token: action.data.token
            }
            default:
            return state
        }
}


export default user