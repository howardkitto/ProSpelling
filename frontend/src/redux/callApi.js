const callApi = (action) =>{
  // console.log('callAPI got ' + JSON.stringify(action))

    console.log('gonna send this.. ' + localStorage.token)

    const errorMessage = {errors: true,
                            server:{
                              message:'Server Error',
                              server: 'Server threw an error'
                            }}

    let headers = {
      'Content-Type': 'application/json'
    }

    if(localStorage.token){
      headers.Authorization = 'bearer ' + localStorage.token
    }


    const request = new Request(action.path, {
    method: action.method,
    headers: new Headers(headers), 
    body: (JSON.stringify(action.payload))
  });

  return fetch(request)

      .then(response => {
        switch(response.status){
          case 500:return(errorMessage)
          case 404:return ({message:'Wrong Path'})
          case 401:return (response.json())
          case 400:return (response.json())
          default : return response.json()
          }
        }
      )
      .catch(
        (error => (console.log('callApi has error ' + error)))
      )
}

export default callApi