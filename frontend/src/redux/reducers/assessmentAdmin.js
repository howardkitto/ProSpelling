function assessmentAdmin(state=[], action){
    // console.log('assessmentAdmin Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GOT_ASSESSMENTS':
            // console.log('assessmentAdmin Reducer running' + JSON.stringify(action))
            return{
                count: action.data.count,
                assessments:action.data.questions
            }
        default:
            return state
    }
}

export default assessmentAdmin