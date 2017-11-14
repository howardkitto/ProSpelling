const assessmentAdmin = (state=[], action)=>{
    // console.log('assessmentAdmin reducer is running')
        switch(action.type){
            case 'GOT_ASSESSMENTS':
            // console.log('assessmentAdmin Reducer got ' +JSON.stringify(action))
            return{
                ...state,
                success:false,
                count:action.data.count,
                assessmentList:action.data.assessments
            }
            case 'EDIT_ASSESSMENT':
            // console.log('assessmentAdmin Reducer got ' +JSON.stringify(action.assessment))
                return{
                    ...state,
                    assessment:action.assessment
                }
            case 'UPDATED_ASSESSMENT':
            // console.log('UPDATED_ASSESSMENT Reducer got ' +JSON.stringify(action))
                return{
                    success:true,
                    assessmentList:[]
                }
            case 'CREATED_ASSESSMENT':
            // console.log('Reducer got ' +JSON.stringify(action.word))
                return{
                    success:true,
                    assessmentList:[]
                    }
            case 'DELETED_ASSESSMENT':
            // console.log('Reducer got ' +JSON.stringify(action))
                return{
                    wordList:[]
                    }
            case 'ASSESSMENT_FORM_ERROR':
            // console.log('Reducer got ' +JSON.stringify(action))
                return{
                    ...state,
                    formError:action.message
                }
            default:
            return state
    }}
    
    export default assessmentAdmin