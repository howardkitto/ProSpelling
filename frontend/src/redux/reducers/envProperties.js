

function envProperties(state=[], action){
    // console.log('serviceMessage running' + JSON.stringify(action))
    switch(action.type){
        case 'SPEECH_SUPPORTED':
        return{
            ...state,
            speechSupported: action.speechSupported
        }

        
        default:
            return state
                    
        }
}



export default envProperties