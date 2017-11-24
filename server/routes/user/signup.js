const express = require('express');
const router = new express.Router();
const Users = require('../../models/Users')

router.route('/')
.post((req, res)=>{

    res.json({'token':'jwt'})
})

module.exports = router