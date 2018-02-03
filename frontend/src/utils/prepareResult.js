import levenshtein from './levenshtein'


const outcome = (answer, question)=>{
    // console.log("prepareResult got " +question +" " +answer)
    return new Promise((resolve, reject)=>{
        let result = {}
            result.cleanedAnswer=answer.replace(/ /g, '').trim()
            result.outcome=(result.cleanedAnswer===question)?'correct':'incorrect'
    
        resolve(result)

    })
}

const prepareResult = async (question, answer)=>{

    const lowerQuestion = question.toLowerCase()
    const lowerAnswer = answer.toLowerCase()

    var result = await outcome(lowerAnswer, lowerQuestion)
    result.score= await levenshtein(lowerAnswer, lowerQuestion)

    return result
}

export default prepareResult