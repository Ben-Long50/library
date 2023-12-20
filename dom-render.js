const domCache = (function() {
    const finishedBooksList = document.getElementById('finished-books-list');
    const unfinishedBooksList = document.getElementById('unfinished-books-list');
    const libraryDailog = document.querySelector('dialog');
    const formButton = document.getElementById('form-button');
    const bookForm = document.querySelector('form');
    const title = bookForm.querySelector('#title');
    const author = bookForm.querySelector('#author');
    const pages = bookForm.querySelector('#pages');
    const submitButton = bookForm.querySelector('#submit-button');

    return {
        finishedBooksList,
        unfinishedBooksList,
        libraryDailog,
        formButton,
        bookForm,
        title,
        author,
        pages,
        submitButton,
    }
})();

(function() {
    domCache.formButton.addEventListener('click', () => {
        domCache.libraryDailog.showModal();
    })

    domCache.submitButton.addEventListener('click', () => {
        const statusInput = document.querySelector('input[name="status"]:checked');
        new Book(domCache.title.value, domCache.author.value, domCache.pages.value, statusInput.id);
        render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
        render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
    })

    domCache.finishedBooksList.addEventListener('click',(e) => {
        const bookCard = e.target.closest('li');
        const index = Array.from(domCache.finishedBooksList.children).indexOf(bookCard);
        if(e.target.classList.contains('remove-button')){
            library.finishedLibrary.splice(index, 1);
        }
        else if(e.target.classList.contains('status-toggle-button')){
            library.finishedLibrary[index].status = 'unfinished';
            library.addBookToLibrary(this);
            library.finishedLibrary.splice(index, 1);
        }
        render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
    })

    domCache.unfinishedBooksList.addEventListener('click',(e) => {
        const bookCard = e.target.closest('li');
        const index = Array.from(domCache.unfinishedBooksList.children).indexOf(bookCard);
        if(e.target.classList.contains('remove-button')){
            library.unfinishedLibrary.splice(index, 1);
        }
        else if(e.target.classList.contains('status-toggle-button')){
            library.unfinishedLibrary[index].status = 'finished';
            library.addBookToLibrary(this);
            library.unfinishedLibrary.splice(index, 1);
        }
        render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
    })
})()

const render = {
    generateCard: function(book, bookList, bookClass) {
        const listItem = document.createElement('li');
        listItem.classList.add(bookClass);

        listItem.innerHTML = `
            <h2>${book.title}</h2>
            <p>Written by: ${book.author}</p>
            <p>Number of Pages: ${book.pages}</p>
            <div class="action-button-container">
                <button class="status-toggle-button">Read</button>
                <button class="remove-button">Remove</button>
            </div>
        `;

        bookList.appendChild(listItem);
    },

    depopulateDom: function(){
        if(domCache.finishedBooksList.firstChild){
            domCache.finishedBooksList.removeChild(domCache.finishedBooksList.firstChild);
        }
        if(domCache.unfinishedBooksList.firstChild){
            domCache.unfinishedBooksList.removeChild(domCache.unfinishedBooksList.firstChild);
        }
    },

    populateLibrary: function(libraryList, bookList, bookClass) {
        this.depopulateDom();
        libraryList.forEach(book => {
            this.generateCard(book, bookList, bookClass);
        });
    }
}