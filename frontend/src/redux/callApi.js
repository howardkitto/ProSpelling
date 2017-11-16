const getWordApi = (action) =>{
  console.log('callAPI got ' + JSON.stringify(action))


    const request = new Request(action.path, {
    method: action.method,
    headers: new Headers({
      'Content-Type': 'application/json'
    }), 
    body: (JSON.stringify(action.payload))
  });

  return fetch(request)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordApi