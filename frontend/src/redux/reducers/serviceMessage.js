

function serviceMessage(state=[], action){
    // console.log('serviceMessage running' + JSON.stringify(action))
    switch(action.type){
        case 'SERVICE_MESSAGE':
        console.log('SERVICE_MESSAGE CALLED' + JSON.stringify(action))
            return{
                message: action.message
            }
            default:
            return state
        }
}



export default serviceMessage