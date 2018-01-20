var SpellingTests = require('../models/SpellingTests');
var User = require('../models/User')

//very chuffed that I got this to work so concisely

const saveSpellingTest = (spellingTest)=>{

    return new Promise((resolve, reject)=>{
            // console.log('saving spellingTest ' + JSON.stringify(spellingTest))
            let user = SpellingTests.findOneAndUpdate(
                {spellingTestId:spellingTest.spellingTestId},
                spellingTest,
                {upsert:true, new:true})
            .then((result)=>resolve(result))
            .catch((error)=>{console.log('err ' +error)
                            reject("Error While Saving Progress")})
        }
    )
}

module.exports = saveSpellingTest