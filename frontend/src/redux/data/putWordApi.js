const putWordApi = (action) =>{
    // console.log('putWordApi ' + JSON.stringify(action))
  
    const request = new Request('../admin/words', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: (JSON.stringify(action.word))
    });
  
    return fetch(request)
        .then(response => response.json()
            )
        .catch(
          (error)=>{console.log('api error ' + error)}
        )
  }
  
  export default putWordApi