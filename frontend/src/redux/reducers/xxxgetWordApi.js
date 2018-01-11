const getWordApi = (action) =>{
  console.log('getWordAPI ' + JSON.stringify(action))

  const request = new Request('../api/getword/criteria/'+action.criteria+'/value/'+action.value, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }), 
    body: (JSON.stringify(action.spellingTest))
  });

  return fetch(request)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getWordApi