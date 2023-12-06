(function() {
    const library = {
        finishedLibrary: [],
        unfinishedLibrary: [],
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            this.finishedBooksList = document.getElementById('finished-books-list');
            this.unfinishedBooksList = document.getElementById('unfinished-books-list');
            this.libraryDailog = document.querySelector('dialog');
            this.formButton = document.getElementById('form-button');
            this.bookForm = document.querySelector('form');
            this.title = this.bookForm.querySelector('#title');
            this.author = this.bookForm.querySelector('#author');
            this.pages = this.bookForm.querySelector('#pages');
            this.submitButton = this.bookForm.querySelector('#submit-button');
        },
        bindEvents: function() {
            this.formButton.addEventListener('click', () => {
                this.libraryDailog.showModal();
            })
            this.submitButton.addEventListener('click', () => {
                const statusInput = document.querySelector('input[name="status"]:checked');
                this.createBook(this.title.value, this.author.value, this.pages.value, statusInput.id);
            })
            this.finishedBooksList.addEventListener('click',(e) => {
                const bookCard = e.target.closest('li');
                const index = Array.from(this.finishedBooksList.children).indexOf(bookCard);
                if(e.target.classList.contains('remove-button')){
                    this.finishedLibrary.splice(index, 1);
                }
                else if(e.target.classList.contains('status-toggle-button')){
                    this.finishedLibrary[index].status = 'unfinished';
                    this.addBookToLibrary(this.finishedLibrary[index]);
                    this.finishedLibrary.splice(index, 1);
                }
                this.render();
            });
            this.unfinishedBooksList.addEventListener('click',(e) => {
                const bookCard = e.target.closest('li');
                const index = Array.from(this.unfinishedBooksList.children).indexOf(bookCard);
                if(e.target.classList.contains('remove-button')){
                    this.unfinishedLibrary.splice(index, 1);
                }
                else if(e.target.classList.contains('status-toggle-button')){
                    this.unfinishedLibrary[index].status = 'finished';
                    this.addBookToLibrary(this.unfinishedLibrary[index]);
                    this.unfinishedLibrary.splice(index, 1);
                }
                this.render();
            });
        },
        render: function() {
            while (this.finishedBooksList.firstChild) {
                this.finishedBooksList.removeChild(this.finishedBooksList.firstChild);
            }
            while (this.unfinishedBooksList.firstChild) {
                this.unfinishedBooksList.removeChild(this.unfinishedBooksList.firstChild);
            }
            this.finishedLibrary.forEach(function(book){
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
                this.finishedBooksList.appendChild(listItem);
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
            }, this);
            this.unfinishedLibrary.forEach(function(book){
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
                this.unfinishedBooksList.appendChild(listItem);
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
            }, this);
        },
        createBook: function(title, author, pages, status) {
            this.addBookToLibrary({
                title: title,
                author: author,
                pages: pages,
                status: status
            });
        },
        addBookToLibrary: function(book) {
            if(book.status === 'finished'){
                this.finishedLibrary.push(book);
            }
            else if(book.status === 'unfinished'){
                this.unfinishedLibrary.push(book);
            }
            this.render();
            this.clearInputs();
        },
        clearInputs: function() {
            this.title.value = '';
            this.author.value = '';
            this.pages.value = '';
        }
    }
    library.init();
})();