const filterPreviousWords = (spellingTestSoFar, allWords)=>{
    return new Promise((resolve, reject)=>{

        // console.log(JSON.stringify(spellingTestSoFar))

        //Make and array of the words answered so far
        let previousWords = spellingTestSoFar.questions.map((y)=>{
            return y["word"]
        })

        //Use this ES2016 function to find the difference between the arrays
        let availableWords = allWords.filter(x => previousWords.indexOf(x.word) == -1);

        resolve(availableWords)
        reject(error)
    })

}

module.exports = filterPreviousWords
