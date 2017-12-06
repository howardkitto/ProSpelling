//Speller - a person who spells with a specified ability

function user(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'CREATED_USER':
        console.log('CREATED_USER' + JSON.stringify(action))
            return{
                token: action.data.token,
                displayName: action.data.displayName,
                success:true
            }
        case 'LOGGEDIN':
        // console.log('LOGGEDIN' + JSON.stringify(action))
            return Object.assign(action.data)
        case 'SYNCH_USER':
            return Object.assign(action.user)
        case 'REMOVE_TOKEN':
        // console.log('REMOVE_TOKEN')
            return{
                ...state,
                token:null,
                loginSuccess:true
            }
        case 'LOG_OUT':
            return{
                logOut:true
            }
        
            default:
            return state
        }
}


export default user