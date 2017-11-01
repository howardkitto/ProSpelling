const wordResult = (question, answer)=>{
    return new Promise((resolve, reject)=>{
        let result = {}
            result.cleanedAnswer=answer.replace(/ /g, '').trim().toLowerCase()
            result.yesOrNo=(result.cleanedAnswer===question)?true:false
    
        resolve(result)

    })
}

export default wordResult