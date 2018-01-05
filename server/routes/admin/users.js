const express = require('express');
const router = new express.Router();
const User = require('../../models/User')


router.route('/page/:page/limit/:limit')

.get((req, res)=>{

    let userCount = 0
    let limit = Number(req.params.limit)
    let skip = Number(req.params.page) * limit

    let counter = ()=>{
        return User.count().exec()
        .then((c)=>{return c})
        .catch((err)=>console.log(err))
     }

     counter()
     .then((c)=>userCount = c)

     let promise = User.find().exec()
        .then((users)=>users.sort((a, b) => {
            a = new Date(a.updatedAt);
            b = new Date(b.updatedAt);
            return a>b ? -1 : a<b ? 1 : 0;
        }))
        .then((users)=>{
            let sliced = users.slice(skip, skip+limit)
            return sliced
        })
        .then((users)=>{
            let userList = {}
            userList.count = userCount
            userList.users = users
            res.setHeader('Content-Type', 'application/json')
            res.json(userList)
            })
        .catch((err)=>{
            console.log('error ' + err)
            })

})

module.exports = router