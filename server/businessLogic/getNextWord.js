const getNextWord = (nextWord) => {
    return new Promise((resolve, reject) =>{
        nextWord.allWordsArray = nextWord.allWords.map((i)=>{return i["word"]})
    
        resolve(nextWord.allWordsArray[12])
    }
)} 

module.exports = getNextWord