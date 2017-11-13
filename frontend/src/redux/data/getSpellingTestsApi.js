const getSpellingTestsListApi = (action) =>{
  // console.log('getWordsListAPI')

  return fetch('../api/spellingTests/page/'+action.page+'/limit/'+action.limit)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getSpellingTestsListApi