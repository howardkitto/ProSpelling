//Speller - a person who spells with a specified ability

function spellingTest(state=[], action){
    // console.log('spellingTest Reducer running' + JSON.stringify(action))
    switch(action.type){
        case 'RESET_SPELLING_TEST':
         return{
            '':''
         }
        case 'GOT_ASSESSMENT':
            return{
                assessment:action.data
            }
            
        case 'SET_UP_SPELLING_TEST':
        // console.log('SET_UP_SPELLING_TEST ' + JSON.stringify(action))
            return{
                ...state,
                spellingTestId: action.spellingTestId,
                createdAt:action.createdAt,
                criteria: action.criteria,
                value: action.value,
                questions: [],
                spellingTestState:'showIntroScreen',
                userId: action.userId
            }
        
        case 'START_SPELLING_TEST':
            return{
                ...state,
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
                spellingTestState: action.nextState,
                userId: action.userId
            }
        
        default:
        return state
        }
}

export default spellingTest