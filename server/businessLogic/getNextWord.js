const getNextWord = (allWords) => {
    return new Promise((resolve, reject) =>{
        allWordsArray = allWords.map((i)=>{return i["word"]})
    
        resolve(allWordsArray[12])
    }
)} 

module.exports = getNextWord