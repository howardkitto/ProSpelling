function spellingTestAdmin(state=[], action){
    // console.log('spellingTestAdmin Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GOT_SPELLING_TESTS':
            // console.log('spellingTestAdmin Reducer running' + JSON.stringify(action))
            return{
                count: action.data.count,
                spellingTests:action.data.questions
            }
        default:
            return state
    }
}

export default spellingTestAdmin