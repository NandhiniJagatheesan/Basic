const express=require('express');
var router=express.Router();
var ObjectId= require('mongoose').Types.ObjectId;

var {Employee}= require('../models/employees');

router.get('/', (req,res)=> { 
    Employee.find((err,docs)=> {
        if(!err) {res.send(docs);}
        else
        console.log('Error in retreiving');
    });
});

//to get via ID
router.get('/id', (req,res)=> {
if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No records found');

Employee.findById(req.params.id, (err,doc)=> {
    if(!err) {res.send(doc);}
    else {console.log('Error in retrieving Employee');}
});

});

router.post('/', (req,res)=> {
    var emp=new Employee({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
    });
emp.save((err,doc)=>{});

});


router.put('/:id', (req,res)=> {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id');

//new details
var emp={ 
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
};

//updates the ID with new info                          //if new is true then doc will have updated values 
Employee.findByIdAndUpdate(req.params.id, {$set:emp}, {new:true}, (err,doc)=>{
    if(!err) {res.send(doc);}
    else {console.log('Error in retrieving Employee');}
});
});



router.delete('/:id', (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id');

Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
    if(!err) {res.send(doc);}
    else {console.log('Error in retrieving Employee');}
});
})

module.exports=router;