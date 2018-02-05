const usersAdmin = (state=[], action) => {
    // console.log('user admin reducer is running')
switch(action.type){

    case 'GOT_USERS_LIST':
        // console.log('GOT_USERS_LIST reducer got '+JSON.stringify(action))
            return{
                ...state,
                success:false,
                count:action.data.count,
                usersList:action.data.users
            }

    case 'EDIT_USER':
    // console.log('Reducer got ' +JSON.stringify(action.user))
        return{
            ...state,
            user:action.user
        }

    case 'UPDATED_USER':
    // console.log('UPDATED_WORD Reducer got ' +JSON.stringify(action))
        return{
            success:true
        }
    case 'DELETED_USER':
    // console.log('Reducer got DELETED_USER' +JSON.stringify(action))
        return{
            success:true
        }

    case 'GOT_USER_TESTS':
    console.log('Reducer got GOT_USER_TESTS' +JSON.stringify(action))
        return{
        ...state,
        userTests: action.data
        }
    default:
    return state
}
}

export default usersAdmin