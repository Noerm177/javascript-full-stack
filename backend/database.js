const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/javascriptdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is conect'))
    .catch(err => console.error(err));
    