const getAssessmentsListApi = () =>{
  // console.log('getWordsListAPI')

  return fetch('../admin/assessments')
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getAssessmentsListApi