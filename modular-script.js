const library = {
    finishedLibrary: [],
    unfinishedLibrary: [],
    init: function() {
        this.cacheDom();
        this.render();

    },
    cacheDom: function() {
        this.finishedBooksList = document.getElementById('finished-books-list');
        this.unfinishedBooksList = document.getElementById('unfinished-books-list');
        this.formButton = document.getElementById('form-button');
        this.newBook = document.querySelector('form');
        this.title = this.newBook.getElementById('title');
        this.author = this.newBook.getElementById('author');
        this.pages = this.newBook.getElementById('pages');
        this.submitButton = this.newBook.getElementById('submit-button');
    },
    render: function() {
        while (finishedBooksList.firstChild) {
            finishedBooksList.removeChild(finishedBooksList.firstChild);
        }
        while (unfinishedBooksList.firstChild) {
            unfinishedBooksList.removeChild(unfinishedBooksList.firstChild);
        }
        finishedLibrary.forEach(function(book){
            const listItem = document.createElement('li');
            const listTitle = document.createElement('h2');
            const listAuthor = document.createElement('p');
            const listPages = document.createElement('p');
            const actionButtonContainer = document.createElement('div');
            const statusToggleButton = document.createElement('button');
            const removeButton = document.createElement('button');
            listItem.classList.add('finished-book-card');
            listTitle.textContent = book.title;
            listAuthor.textContent = 'Written by: ' + book.author;
            listPages.textContent = 'Number of Pages: ' + book.pages;
            finishedBooksList.appendChild(listItem);
            listItem.appendChild(listTitle);
            listItem.appendChild(listAuthor);
            listItem.appendChild(listPages);
            listItem.appendChild(actionButtonContainer);
            actionButtonContainer.classList.add('action-button-container');
            actionButtonContainer.appendChild(statusToggleButton);
            statusToggleButton.textContent = 'Read';
            statusToggleButton.classList.add('status-toggle-button');
            actionButtonContainer.appendChild(removeButton);
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove';
        })
        unfinishedLibrary.forEach(function(book){
            const listItem = document.createElement('li');
            const listTitle = document.createElement('h2');
            const listAuthor = document.createElement('p');
            const listPages = document.createElement('p');
            const actionButtonContainer = document.createElement('div');
            const statusToggleButton = document.createElement('button');
            const removeButton = document.createElement('button');
            listItem.classList.add('unfinished-book-card');
            listTitle.textContent = book.title;
            listAuthor.textContent = 'Written by: ' + book.author;
            listPages.textContent = 'Number of Pages: ' + book.pages;
            unfinishedBooksList.appendChild(listItem);
            listItem.appendChild(listTitle);
            listItem.appendChild(listAuthor);
            listItem.appendChild(listPages);
            listItem.appendChild(actionButtonContainer);
            actionButtonContainer.classList.add('action-button-container');
            actionButtonContainer.appendChild(statusToggleButton);
            statusToggleButton.textContent = 'Unread';
            statusToggleButton.classList.add('status-toggle-button');
            actionButtonContainer.appendChild(removeButton);
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove';
        })
    },
    addBookToLibrary: function() {

    }
}