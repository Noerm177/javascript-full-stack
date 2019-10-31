if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

//Init
const app = express();
require('./database');

//Setting
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null,new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/api/books', require('./routes/books'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});