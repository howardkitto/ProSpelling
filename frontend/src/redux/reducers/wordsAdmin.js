const wordsAdmin = (state=[], action)=>{
// console.log('words reducer is running')
    switch(action.type){
        case 'GOT_WORDS_LIST':
            return{
                ...state,
                success:false,
                wordsList : action.data
            }
        case 'EDIT_WORD':
        // console.log('Reducer got ' +JSON.stringify(action.word))
            return{
                ...state,
                word:action.word
            }
        case 'UPDATED_WORD':
        console.log('UPDATED_WORD Reducer got ' +JSON.stringify(action))
            return{
                success:true,
                wordList:[]
            }
        case 'CREATED_WORD':
        // console.log('Reducer got ' +JSON.stringify(action.word))
            return{
                success:true,
                wordList:[]
            }
        case 'DELETED_WORD':
        // console.log('Reducer got ' +JSON.stringify(action))
            return{
                wordList:[]
            }
        case 'FORM_ERROR':
        // console.log('Reducer got ' +JSON.stringify(action))
            return{
                ...state,
                formError:action.message
            }
        default:
        return state
}}

export default wordsAdmin