//Speller - a person who spells with a specified ability

function user(state=[], action){
    // console.log('Speller Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'CREATED_USER':
        console.log('CREATED_USER' + JSON.stringify(action))
            return Object.assign(
                action.data,
                {signUpSuccess:true}
            )   
        case 'LOGGEDIN':
        // console.log('LOGGEDIN' + JSON.stringify(action))
            return Object.assign(action.data,
                {logInSuccess:true})


        //To Do: this logic is not correct at all        
        case 'SYNCH_USER':
        // console.log('SYNCH_USER' + JSON.stringify(action))
            return Object.assign(action.user)
        case 'LOG_OUT':
            return{
                logOut:true
            }
        
            default:
            return state
        }
}


export default user