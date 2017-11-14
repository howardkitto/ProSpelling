const putAssessmentApi = (action) =>{
    // console.log('putWordApi ' + JSON.stringify(action))
  
    const request = new Request('../api/assessments', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: (JSON.stringify(action.assessment))
    });
  
    return fetch(request)
        .then(response => response.json()
            )
        .catch(
          (error)=>{console.log('api error ' + error)}
        )
  }
  
  export default putAssessmentApi