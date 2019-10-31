const {Router} = require('express');
const router = Router();

const Book = require('../models/book');

//muestra peticion con get para esa ruta
router.get('/', async (req, res) => {
   const books = await Book.find();
   res.json(books);
});

//muestra peticion con  post para esa ruta

router.post('/', async (req, res) => {
    const {title, author, isbn} = req.body;
    new Book({title, author, isbn});
    const newBook = new Book({title, author, isbn});
    await newBook.save();
    console.log(newBook);
    res.json({message:'Book Saved'});
});

router.delete('/:id', async(req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({message: 'Book deleting'});
});

module.exports = router;