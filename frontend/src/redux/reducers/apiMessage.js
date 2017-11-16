

function apiMessage(state=[], action){
    // console.log('APIReducer running' + JSON.stringify(action))
    switch(action.type){
        case 'API_MESSAGE':
            return{
                message: action.message
            }
            default:
            return state
        }
}



export default apiMessage