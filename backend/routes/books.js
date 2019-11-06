const {Router} = require('express');
const router = Router();
const fs = require('fs');
const {unlink} = require('fs-extra');
const Book = require('../models/book');
const path = require('path');

//muestra peticion con get para esa ruta
router.get('/', async (req, res) => {
   const books = await Book.find();
   res.json(books);
});

//muestra peticion con  post para esa ruta

router.post('/', async (req, res) => {
    const {title, author, isbn} = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save();
    res.json({message:'Book Saved'});
});

router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('/backend/public' + book.imagePath));
    res.json({message: 'Book deleting'});
});

module.exports = router;