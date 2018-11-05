const patternAdmin = (state=[], action)=>{
    switch(action.type){
        case "GOT_PATTERNS":
        // console.log('patternAdmin Reducer got ' +JSON.stringify(action))
        
        return{
            ...state,
            success:false,
            count:action.data.count,
            patternList:action.data.patterns
        }
        case 'EDIT_PATTERN':
        // console.log('patternAdmin Reducer got ' +JSON.stringify(action.pattern))
            return{
                ...state,
                pattern:action.pattern
            }
        case 'CREATED_PATTERN':
        console.log('Reducer got ' +JSON.stringify(action.word))
            return{
                ...state,
                success:true,
                patternList:[]
                }
        default:
            return state
    }
}



export default patternAdmin