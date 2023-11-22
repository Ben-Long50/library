const myLibrary = [];

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    addBookToLibrary(this);
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

const theFellowshipOfTheRing = new Book('The Fellowship of the Rings', 'JRR Tolkien', '432', 'read');

console.log(myLibrary);