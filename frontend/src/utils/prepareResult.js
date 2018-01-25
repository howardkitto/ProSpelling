import levenshtein from './levenshtein'


const outcome = (question, answer)=>{
    // console.log("prepareResult got " +question +" " +answer)
    return new Promise((resolve, reject)=>{
        let result = {}
            result.cleanedAnswer=answer.replace(/ /g, '').trim().toLowerCase()
            result.outcome=(result.cleanedAnswer===question)?'correct':'incorrect'
    
        resolve(result)

    })
}

const prepareResult = async (question, answer)=>{

    var result = await outcome(question, answer)
    result.score= await levenshtein(answer, question)

    return result
}

export default prepareResult