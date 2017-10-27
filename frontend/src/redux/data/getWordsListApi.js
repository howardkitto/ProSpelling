const getWordsListApi = () =>{
  // console.log('getWordsListAPI')

  return fetch('../admin/words')
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordsListApi