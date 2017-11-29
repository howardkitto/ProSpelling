//Speller - a person who spells with a specified ability

function user(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'CREATED_USER':
        // console.log('CREATED_USER' + JSON.stringify(action))
            return{
                token: action.data.token
            }
        case 'LOGGEDIN':
        // console.log('LOGGEDIN' + JSON.stringify(action))
            return Object.assign(action.data)
        case 'REMOVE_TOKEN':
        // console.log('REMOVE_TOKEN')
            return{
                ...state,
                token:null
            }
        
            default:
            return state
        }
}


export default user