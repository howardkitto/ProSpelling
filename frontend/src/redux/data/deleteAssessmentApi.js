const deleteAssessmentApi = (action) =>{
    // console.log('deleteWordApi ' + JSON.stringify(action.word))
  
    const request = new Request('../api/assessments', {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: (JSON.stringify(action.assessment))
    });
  
    return fetch(request)
        .then(response => response.json())
        .catch(
          (error)=>{console.log('api error ' + error)}
        )
  }
  
  export default deleteAssessmentApi