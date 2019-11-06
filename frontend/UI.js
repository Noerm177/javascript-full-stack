import BookService from './models/services/BookService';
const bookService = new BookService();
import {format} from 'timeago.js';
import { set } from 'mongoose';

class UI {

    async renderBooks(){
        const books = await bookService.getBook();
        const bookCardContainer = document.getElementById('books-cards');
        bookCardContainer.innerHTML = '';//nada de html ahi
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            ////http://localhost:4000
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">DEL</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.create_at)}
                    </div>
                </div>
            `;      
            bookCardContainer.appendChild(div);
        });
    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className =  `alert alert-${colorMessage} message`; 
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
    
        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);

    }

    async deleteBook(bookID){//bookID
        await bookService.deleteBook(bookID);
    }
}
export default UI;