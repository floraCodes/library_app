class App {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.$form = document.querySelector('form');
    this.$newButton = document.querySelector('.new-book-button');
    this.$modal = document.querySelector('.modal');
    this.$closeModalButton = document.querySelector('.modal-cancel-button');
    this.$bookTitle = document.querySelector('.modal-title');
    this.$bookAuthor = document.querySelector('.modal-author');
    this.$bookPages = document.querySelector('.modal-pages');
    this.$books = document.querySelector('.books');
    this.$body = document.querySelector('body');
    this.displayCard();
    this.addEventListeners();
  }

  addEventListeners() {
    this.$body.addEventListener('click', (event) => {
      this.deleteBook(event);
      this.readStatus(event);
    });
    this.$newButton.addEventListener('click', () => {
      this.openModal();
    });
    this.$closeModalButton.addEventListener('click', () => {
      this.closeModal();
    });
    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = this.$bookTitle.value;
      const author = this.$bookAuthor.value;
      const pages = this.$bookPages.value;
      const hasBook = title && author && pages;
      if (hasBook) {
        this.addBook({ title: title, author: author, pages: pages });
      } else {
        alert('please fill all fields');
      }
    });
  }

  openModal() {
    this.$modal.classList.add('open-modal');
  }

  closeModal() {
    this.$modal.classList.remove('open-modal');
    this.$bookTitle.value = '';
    this.$bookAuthor.value = '';
    this.$bookPages.value = '';
  }

  addBook({ title, author, pages }) {
    const newBook = {
      title,
      author,
      pages,
      status: 'Unread',
      id: this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1
    };
    this.books = [...this.books, newBook];
    this.displayCard();
    this.closeModal();
  }

  displayCard() {
    this.saveBooks();
    this.$books.innerHTML = this.books.map(
      (book) => `
      <div class="book-card" data-id="${book.id}">
        <div class="book-info">
          <p class="book-title">${book.title}</p>
          <p class="book-author">Written by ${book.author}</p>
          <p class="book-pages">${book.pages} pages.</p>
          <button class="read-status-button ${
            book.status == 'Unread' && 'unread-status'
          }">${book.status}</button>
        </div>
        <div class="toolbar-container">
          <div class="toolbar">
            <button class="close-card-button"><img class="toolbar-delete" src="https://icon.now.sh/delete"></button>
          </div>
        </div>
      </div>
      `
    );
  }

  deleteBook(event) {
    const selectedElementMatches = event.target.matches('.toolbar-delete');
    if (!selectedElementMatches) return;
    const $bookToDelete = event.target.closest('.book-card');
    this.books = this.books.filter(
      (book) => book.id != $bookToDelete.dataset.id
    );
    this.displayCard();
  }

  readStatus(event) {
    const selectedElementMatches = event.target.matches('.read-status-button');
    const $clickedButton = event.target;
    if (!selectedElementMatches) return;
    const $bookToUpdate = event.target.closest('.book-card');
    this.books.map((book) => {
      if (book.id === Number($bookToUpdate.dataset.id)) {
        if (book.status === 'Read') {
          book.status = 'Unread';
          $clickedButton.classList.add('unread-status');
        } else {
          book.status = 'Read';
          $clickedButton.classList.remove('unread-status');
        }
      }
    });
    this.displayCard();
  }
  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

new App();
