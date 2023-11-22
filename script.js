const myCompleteLibrary = [];
const finishedLibrary = [];
const unfinishedLibrary = [];
const finishedBooksList = document.getElementById('finished-books-list');
const unfinishedBooksList = document.getElementById('unfinished-books-list');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const submitButton = document.getElementById('submit-button');
const formButton = document.getElementById('form-button');
const form = document.getElementById('form');
const body = document.querySelector('body');

formButton.addEventListener('click', function(){
    if(form.classList.contains('hide-form')){
        body.classList.toggle('expand-form');
        form.classList.remove('hide-form');
        form.classList.add('show-form');

    }
    else if(form.classList.contains('show-form')){
        body.classList.toggle('expand-form');
        form.classList.remove('show-form');
        form.classList.add('hide-form');
    }
})

submitButton.addEventListener('click', function(){
    const statusInput = document.querySelector('input[name="status"]:checked');
    new Book(title.value, author.value, pages.value, statusInput.id);
    while (finishedBooksList.firstChild) {
        finishedBooksList.removeChild(finishedBooksList.firstChild);
    }
    while (unfinishedBooksList.firstChild) {
        unfinishedBooksList.removeChild(unfinishedBooksList.firstChild);
    }
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
    myCompleteLibrary.push(book);
    const status = book.status;
    if(status === 'finished'){
        finishedLibrary.push(book);
    }
    else if(status === 'unfinished'){
        unfinishedLibrary.push(book);
    }
}

function clearInputs(){
    title.value = '';
    author.value = '';
    pages.value = '';
}

function displayBook(){
    finishedLibrary.forEach(function(book){
        const listItem = document.createElement('li');
        const listTitle = document.createElement('h2');
        const listAuthor = document.createElement('p');
        const listPages = document.createElement('p');
        listItem.classList.add('finished-book-card');
        listTitle.textContent = book.title;
        listAuthor.textContent = 'Written by: ' + book.author;
        listPages.textContent = 'Number of Pages: ' + book.pages;
        finishedBooksList.appendChild(listItem);
        listItem.appendChild(listTitle);
        listItem.appendChild(listAuthor);
        listItem.appendChild(listPages);
    })
    unfinishedLibrary.forEach(function(book){
        const listItem = document.createElement('li');
        const listTitle = document.createElement('h2');
        const listAuthor = document.createElement('p');
        const listPages = document.createElement('p');
        listItem.classList.add('finished-book-card');
        listTitle.textContent = book.title;
        listAuthor.textContent = 'Written by: ' + book.author;
        listPages.textContent = 'Number of Pages: ' + book.pages;
        unfinishedBooksList.appendChild(listItem);
        listItem.appendChild(listTitle);
        listItem.appendChild(listAuthor);
        listItem.appendChild(listPages);
    })
}