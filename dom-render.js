const domCache = (function() {
    const finishedBooksList = document.getElementById('finished-books-list');
    const unfinishedBooksList = document.getElementById('unfinished-books-list');
    const libraryDailog = document.querySelector('#library-dialog');
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
        if(statusInput.id === 'finished') {
            render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
        }
        if(statusInput.id === 'unfinished') {
            render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
        }
    })

    domCache.finishedBooksList.addEventListener('click',(e) => {
        const bookCardArray = Array.from(domCache.finishedBooksList.children);
        const bookCard = e.target.closest('li');
        const index = bookCardArray.indexOf(bookCard);
        if(e.target.classList.contains('remove-button')){
            library.finishedLibrary.splice(index, 1);
            render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
        }
        else if(e.target.classList.contains('status-toggle-button')){
            library.finishedLibrary[index].status = 'unfinished';
            library.addBookToLibrary(library.finishedLibrary[index]);
            library.finishedLibrary.splice(index, 1);
            render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
            render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
        }
    })

    domCache.unfinishedBooksList.addEventListener('click',(e) => {
        const bookCardArray = Array.from(domCache.unfinishedBooksList.children);
        const bookCard = e.target.closest('li');
        const index = bookCardArray.indexOf(bookCard);
        if(e.target.classList.contains('remove-button')){
            library.unfinishedLibrary.splice(index, 1);
            render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
        }
        else if(e.target.classList.contains('status-toggle-button')){
            library.unfinishedLibrary[index].status = 'finished';
            library.addBookToLibrary(library.unfinishedLibrary[index]);
            library.unfinishedLibrary.splice(index, 1);
            render.populateLibrary(library.finishedLibrary, domCache.finishedBooksList, 'finished-book-card');
            render.populateLibrary(library.unfinishedLibrary, domCache.unfinishedBooksList, 'unfinished-book-card');
        }
    })
})()

const render = {
    generateCard: function(book, bookList, bookClass) {
        const listItem = document.createElement('li');
        listItem.classList.add(bookClass);
        bookList.appendChild(listItem);

        const listTitle = document.createElement('h2');
        listTitle.textContent = book.title;
        listItem.appendChild(listTitle);

        const listAuthor = document.createElement('p');
        listAuthor.textContent = 'Written by: ' + book.author;
        listItem.appendChild(listAuthor);

        const listPages = document.createElement('p');
        listPages.textContent = 'Number of Pages: ' + book.pages;
        listItem.appendChild(listPages);

        const actionButtonContainer = document.createElement('div');
        actionButtonContainer.classList.add('action-button-container');
        listItem.appendChild(actionButtonContainer);

        const statusToggleButton = document.createElement('button');
        statusToggleButton.classList.add('status-toggle-button');
        statusToggleButton.textContent = 'Read';
        actionButtonContainer.appendChild(statusToggleButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        actionButtonContainer.appendChild(removeButton);
    },

    depopulateDom: function(bookList){
        while(bookList.firstChild){
            bookList.removeChild(bookList.firstChild);
        }
    },

    populateLibrary: function(libraryList, bookList, bookClass) {
        this.depopulateDom(bookList);
        libraryList.forEach(book => {
            this.generateCard(book, bookList, bookClass);
        }, this);
    }
}