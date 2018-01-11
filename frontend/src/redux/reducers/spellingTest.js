//Speller - a person who spells with a specified ability

function spellingTest(state=[], action){
    // console.log('spellingTest Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GOT_ASSESSMENT_ID':
            return{
                assessment:action.data.foundAssessment
            }
        case 'START_SPELLING_TEST':
            return{
                // ...state,
                spellingTestId: action.spellingTestId,
                createdAt:action.createdAt,
                criteria: action.criteria,
                value: action.value,
                questions: [],
                spellingTestState:'startSpellingTest'
            }
        case 'GOT_WORD':
            return {
                ...state,
                spellingTestState:'inProgress'
            }
        case 'CHANGE_SPELLING_TEST_STATE':
            return{
                ...state,
                spellingTestState:'waitingToContinue'
            }
        case 'SAVE_PROGRESS':
        // console.log('reducer got ' + JSON.stringify(action))
            return{
                ...state,
                questions: [...state.questions, action.question],
                spellingTestState: action.nextState
            }
        case 'SPELLING_TEST_COMPLETE':
            return{
                spellingTestState: 'complete'
            }
        default:
        return state
        }
}

export default spellingTest