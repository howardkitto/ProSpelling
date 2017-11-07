var Assessments = require('../models/Assessments');

//very chuffed that I got this to work so concisely

const saveAssessment = (assessment)=>{
    return new Promise((resolve, reject)=>{

            Assessments.findOneAndUpdate(
                {assessmentId:assessment.assessmentId},
                assessment,
                {upsert:true, new:true})
            .then((result)=>resolve(result))
            .catch((err)=>console.log('err ' +err))
        }
    )
}

module.exports = saveAssessment