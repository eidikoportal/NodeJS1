// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) { console.log('Connection Successfull'); }
    else { console.log('Error in Db Connection' + err); }
});

require('./employee-sechma');