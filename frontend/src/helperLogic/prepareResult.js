import levenshtein from './levenshtein'


const prepareResult = (question, answer)=>{
    return new Promise((resolve, reject)=>{
        let result = {}
            result.cleanedAnswer=answer.replace(/ /g, '').trim().toLowerCase()
            result.yesOrNo=(result.cleanedAnswer===question)?'correct':'incorrect'
            result.score=levenshtein(answer, question)
    
        resolve(result)

    })
}

export default prepareResult