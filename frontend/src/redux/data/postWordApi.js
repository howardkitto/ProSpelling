const postWordApi = (action) =>{
    // console.log('getWordAPI ' + JSON.stringify(action))
  
    const request = new Request('../admin/words', {
      method: 'POST',
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
  
  export default postWordApi