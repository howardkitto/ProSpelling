import levenshtein from './levenshtein'


const wordResult = (question, answer)=>{
    return new Promise((resolve, reject)=>{
        let result = {}
            result.cleanedAnswer=answer.replace(/ /g, '').trim().toLowerCase()
            result.yesOrNo=(result.cleanedAnswer===question)?'correct':'incorrect'
            result.score=levenshtein(answer, question)
    
        resolve(result)

    })
}

export default wordResult