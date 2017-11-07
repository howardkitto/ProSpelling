//Speller - a person who spells with a specified ability

function assessment(state=[], action){
    // console.log('assessment Reducer running' + JSON.stringify(action))
    switch(action.type){
        
        case 'START_ASSESSMENT':
            return{
                ...state,
                assessmentId: action.assessmentId,
                createdAt:action.createdAt,
                level: action.level,
                questions: [],
                assessmentState:'startAssessment'
            }
        case 'GOT_WORD':
            return {
                ...state,
                assessmentState:'inProgress'
            }
        case 'CHANGE_ASSESSMENT_STATE':
            return{
                ...state,
                assessmentState:'waitingToContinue'
            }
        case 'SAVE_PROGRESS':
        // console.log('reducer got ' + JSON.stringify(action))
            return{
                ...state,
                questions: [...state.questions, action.question],
                assessmentState: 'waitingToContinue'
            }
        case 'ASSESSMENT_COMPLETE':
            return{
                assessmentState: 'complete'
            }
        default:
        return state
        }
}

export default assessment