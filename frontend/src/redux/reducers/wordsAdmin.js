const wordsAdmin = (state=[], action)=>{
// console.log('words reducer is running')
    switch(action.type){
        case 'GOT_WORDS_LIST':
            return{
                ...state,
                wordsList : action.data
            }
        case 'EDIT_WORD':
        console.log('Reducer got ' +JSON.stringify(action.word))
            return{
                ...state,
                word:action.word
            }
        default:
        return state
}}

export default wordsAdmin