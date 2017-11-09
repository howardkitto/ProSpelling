const express = require('express');
const router = new express.Router();
const Assessments = require('../../models/Assessments')

router.route('/')

.get((req, res)=>{
    var promise = Assessments.count({}).exec()
    .then(count=>res.json({"count":count}))
})


module.exports = router