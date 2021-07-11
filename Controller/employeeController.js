const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
        viewTitle:"Insert Employee"
    });
});

router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body._id == ''){
        insertRec(req,res);
    }else{
        updateRec(req,res);
    }
    
});

function insertRec(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.EmailId = req.body.EmailId;
    employee.Mobile = req.body.Mobile;
    employee.City = req.body.City;
    employee.save((err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
           // console.log("error while inserting"+err);
            if(err.name == 'ValidationError'){
                handleValidationerror(err,req.body);   
                res.render("employee/addOrEdit",{
                    viewTitle:"Insert Employee",
                    employee : req.body
                });        
             }else{
                console.log("error while inserting"+err);
            }
           
        }
    });
}
function updateRec(req,res){ 
    Employee.findByIdAndUpdate({_id:req.body._id},req.body,{new:true},(err,docs)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationerror(err,req.body);   
                res.render("employee/addOrEdit",{
                    viewTitle:"Update Employee",
                    employee : req.body
                });        
             }else{
                console.log("error while updating rec"+err);
            }
        }
    });
}

router.get('/list',(req,res)=>{
   // res.json("from list");
    Employee.find((err,docs)=>{
        if(!err){
            console.log(docs);
            res.render("employee/list",{
                list:docs 
            });
        }else{
            console.log('error while retrieving employee list');
        }
    });
});

router.get('/:id',(req,res)=>{
    // res.json("from list");
     Employee.findById(req.params.id,(err,doc)=>{
         if(!err){
             console.log(doc);
             res.render("employee/addOrEdit",{
                viewTitle:"Update Employee",
                 employee: doc 
             });
         }else{
             console.log('error while retrieving employee list');
         }
     });
 });

 router.get('/delete/:id',(req,res)=>{
    // res.json("from list");
     Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
         if(!err){
             console.log(doc);
             res.redirect('/employee/list');
         }else{
             console.log('error while retrieving employee list'+ err);
         }
     });
 });

function handleValidationerror(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'EmailId':
                body['EmailIdError'] = err.errors[field].message;
                break;
            default:
        }
    }
}
module.exports = router; 