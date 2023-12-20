const library = (function() {
    const finishedLibrary = [];
    const unfinishedLibrary = [];

    function addBookToLibrary(book) {
        if(book.status === 'finished'){
            finishedLibrary.push(book);
        }
        else if(book.status === 'unfinished'){
            unfinishedLibrary.push(book);
        }
    }

    return {
        finishedLibrary,
        unfinishedLibrary,
        addBookToLibrary
    }
}())

class Book{
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        library.addBookToLibrary(this);
    }
}