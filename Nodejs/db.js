const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CrudDB', (err)=> {
    if(!err)
    console.log('MongoDB successfully connected!');
    else
    console.log('Error');
});

module.exports= mongoose;