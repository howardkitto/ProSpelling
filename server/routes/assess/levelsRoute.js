const express = require('express');
const router = new express.Router();

router.route('/')
.get((req, res)=>{

    const levels = () =>{

        console.log("levels route")

        const availableLevels = [1,2,3,4]

        res.send(availableLevels)

    }

    levels()
})

module.exports = router