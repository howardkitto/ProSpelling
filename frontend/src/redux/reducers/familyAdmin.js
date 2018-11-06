const familyAdmin = (state=[], action)=>{
    switch(action.type){
        case "GOT_FAMILIES":
        // console.log('familyAdmin Reducer got ' +JSON.stringify(action))
        
        return{
            ...state,
            success:false,
            count:action.data.count,
            familyList:action.data.families
        }
        case 'EDIT_FAMILY':
        console.log('familyAdmin Reducer got ' +JSON.stringify(action.family))
            return{
                ...state,
                family:action.family
            }
        case 'CREATED_FAMILY':
        // console.log('Reducer got ' +JSON.stringify(action.family))
            return{
                ...state,
                success:true,
                familyList:[]
                }
        case 'DELETED_FAMILY':
        // console.log('Reducer got ' +JSON.stringify(action))
            return{
                familyList:[]
                }
        default:
            return state
    }
}

export default familyAdmin