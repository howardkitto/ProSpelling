const getWordsListApi = (action) =>{
  // console.log('getWordsListAPI ' + JSON.stringify(action))

  return fetch('../api/words/page/'+action.page+'/limit/'+action.limit)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordsListApi