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

    const upperQuestion = question.toUpperCase()
    const upperAnswer = answer.toUpperCase()

    var result = await outcome(upperAnswer, upperQuestion)
    result.score= await levenshtein(upperAnswer, upperQuestion)

    return result
}

export default prepareResult