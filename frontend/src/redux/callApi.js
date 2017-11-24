const callApi = (action) =>{
  // console.log('callAPI got ' + JSON.stringify(action))


    const request = new Request(action.path, {
    method: action.method,
    headers: new Headers({
      'Content-Type': 'application/json'
    }), 
    body: (JSON.stringify(action.payload))
  });

  return fetch(request)
      .then(response => {
        switch(response.status){
          case 500:return({message:'Server threw an error'})
          case 404:return ({message:'Wrong Path'})
          default : return response.json()
          }
        }
      )
      .catch(
        (error => (console.log('callApi has error')))
      )
}

export default callApi