const getWordApi = (action) =>{
  // console.log('getWordAPI ' + JSON.stringify(action))

  const request = new Request('../assess/getword', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }), 
    body: (JSON.stringify(  {level : action.level,
                            assessment : action.assessment}))
  });

  return fetch(request)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordApi