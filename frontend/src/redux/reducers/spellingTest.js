//Speller - a person who spells with a specified ability

function spellingTest(state=[], action){
    // console.log('spellingTest Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'GOT_ASSESSMENT_ID':
            return{
                assessment:action.data
            }
            
        case 'START_SPELLING_TEST':
        // console.log('START_SPELLING_TEST ' + JSON.stringify(action))
            return{
                ...state,
                spellingTestId: action.spellingTestId,
                createdAt:action.createdAt,
                criteria: action.criteria,
                value: action.value,
                questions: [],
                spellingTestState:'startSpellingTest'
            }
        case 'GET_WORD':
        // console.log('Reducer GET_WORD ' + JSON.stringify(action))
            return{
                ...state,
                spellingTestState:'gettingWord'
            }
        case 'GOT_WORD':
        // console.log('Reducer GOT_WORD ' + JSON.stringify(action))
            return {
                ...state,
                spellingTestState:'inProgress'
            }
        // case 'CHANGE_SPELLING_TEST_STATE':
        //     return{
        //         ...state,
        //         spellingTestState:'waitingToContinue'
        //     }
        case 'SPELLING_TEST_COMPLETE':
            return{
                ...state,
                spellingTestState:'spellingTestComplete'
            }
        case 'SAVE_PROGRESS':
        // console.log('reducer got ' + JSON.stringify(action))
            return{
                ...state,
                questions: [...state.questions, action.question],
                spellingTestState: action.nextState
            }
        
        default:
        return state
        }
}

export default spellingTest