const finishedLibrary = [];
const unfinishedLibrary = [];
const finishedBooksList = document.getElementById('finished-books-list');
const unfinishedBooksList = document.getElementById('unfinished-books-list');
const libraryDailog = document.querySelector('dialog');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const submitButton = document.getElementById('submit-button');
const formButton = document.getElementById('form-button');
const form = document.getElementById('form');
const body = document.querySelector('body');

formButton.addEventListener('click', function(){
    libraryDailog.showModal();
})

submitButton.addEventListener('click', function(){
    const statusInput = document.querySelector('input[name="status"]:checked');
    new Book(title.value, author.value, pages.value, statusInput.id);
    displayBook();
    clearInputs();
})

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    addBookToLibrary(this);
}

function addBookToLibrary(book){
    const status = book.status;
    if(status === 'finished'){
        finishedLibrary.push(book);
    }
    else if(status === 'unfinished'){
        unfinishedLibrary.push(book);
    }
}

Book.prototype.changeStatus = function(book){
    if(book.status === 'finished'){
        book.status = 'unfinished';
    }
    else if(book.status === 'finished'){
        book.status = 'unfinished';
    }
    displayBook();
}

finishedBooksList.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-button')){
        const bookCard = e.target.closest('li');
        const index = Array.from(bookCard.parentNode.children).indexOf(bookCard);
        finishedLibrary.splice(index, 1);
    }
    displayBook();
});

unfinishedBooksList.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-button')){
        const bookCard = e.target.closest('li');
        const index = Array.from(bookCard.parentNode.children).indexOf(bookCard);
        unfinishedLibrary.splice(index, 1);
    }
    displayBook();
});

function clearInputs(){
    title.value = '';
    author.value = '';
    pages.value = '';
}

function displayBook(){
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
        statusToggleButton.textContent = 'Unread';
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
        actionButtonContainer.appendChild(removeButton);
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
    })
}