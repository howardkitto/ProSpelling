const words = (state=[], action)=>{
// console.log('words reducer is running')
    switch(action.type){
        case 'GOT_WORDS_LIST':
            return{
                ...state,
                wordsList : action.data
            }
        default:
        return state
}}

export default words