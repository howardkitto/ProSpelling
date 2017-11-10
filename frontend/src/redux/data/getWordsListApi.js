const getWordsListApi = () =>{
  // console.log('getWordsListAPI')

  return fetch('../api/words')
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordsListApi