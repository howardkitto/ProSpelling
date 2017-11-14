const getAssessmentsApi = (action) =>{
  // console.log('getAssessmentsApi')

  return fetch('../api/assessments/page/'+action.page+'/limit/'+action.limit)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getAssessmentsApi