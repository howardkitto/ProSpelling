var SpellingTests = require('../models/SpellingTests');

//very chuffed that I got this to work so concisely

const saveSpellingTest = (spellingTest)=>{
    return new Promise((resolve, reject)=>{

            SpellingTests.findOneAndUpdate(
                {spellingTestId:spellingTest.spellingTestId},
                spellingTest,
                {upsert:true, new:true})
            .then((result)=>resolve(result))
            .catch((err)=>console.log('err ' +err))
        }
    )
}

module.exports = saveSpellingTest