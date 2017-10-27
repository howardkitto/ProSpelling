const getNextWordApi = () =>{
  // console.log('getNextWordAPI')

  return fetch('../assess/getnextword')
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getNextWordApi