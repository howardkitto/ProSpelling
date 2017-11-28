

function serviceMessage(state=[], action){
    // console.log('serviceMessage running' + JSON.stringify(action))
    switch(action.type){
        case 'SERVICE_MESSAGE':
        console.log('SERVICE_MESSAGE CALLED' + JSON.stringify(action))
            return Object.assign(action.message)
        
        case 'GOT_ENV':
        console.log('SERVICE_MESSAGE CALLED' + JSON.stringify(action))
        return {env: Object.assign(action.data)}
        
        default:
        return {message:'All Good',
                env:{}}
        }
}



export default serviceMessage