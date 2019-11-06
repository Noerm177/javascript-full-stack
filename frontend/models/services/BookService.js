

class BookService {
    constructor(){
        this.URI = 'http://localhost:4000/api/books';
    }

    async getBook() {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

    async postBook(books){
        const res = await fetch(this.URI, {
            method: 'POST',
            body: books
        });
        const data = await res.json();
        console.log(data);
    }

    async deleteBook(bookID){
        const res = await fetch(`${this.URI}/${bookID}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);

    }
}
export default BookService;