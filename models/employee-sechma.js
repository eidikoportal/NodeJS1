const mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required:'This field is required.'
        },
        EmailId:{type: String},
        Mobile:{type: String},
        City:{type: String}
    }
);
EmployeeSchema.path('EmailId').validate((val)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
},'Invalid EmailId');
mongoose.model('Employee',EmployeeSchema); 


