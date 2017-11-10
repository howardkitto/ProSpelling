const getAssessmentsListApi = (action) =>{
  // console.log('getWordsListAPI')

  return fetch('../admin/assessments/page/'+action.page+'/limit/'+action.limit)
      .then(response => response.json()
          )
      .catch(
        (error)=>{console.log('api error ' + error)}
      )
}

export default getAssessmentsListApi