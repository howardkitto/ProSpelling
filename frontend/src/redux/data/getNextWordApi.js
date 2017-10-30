const getNextWordApi = (action) =>{
  // console.log('getNextWordAPI ' + JSON.stringify(action))

  const request = new Request('../assess/getnextword', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }), 
    body: (JSON.stringify({level : action.level}))
  });

  return fetch(request)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getNextWordApi