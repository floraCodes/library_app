class App {
  constructor() {
    this.books = [];
    this.title = "";
    this.author = "";
    this.pages = 0;

    this.$body = document.querySelector("body");
    this.$form = document.querySelector("form");
    this.$newButton = document.querySelector(".new-book-button");
    this.$modal = document.querySelector(".modal");
    this.$closeModalButton = document.querySelector(".modal-cancel-button");
    this.$bookTitle = document.querySelector(".modal-title");
    this.$bookAuthor = document.querySelector(".modal-author");
    this.$bookPages = document.querySelector(".modal-pages");
    this.$books = document.querySelector(".books");

    this.addEventListeners();
  }
  addEventListeners() {
    this.$body.addEventListener("click", event => {
      this.deleteBook(event);
    });
    this.$newButton.addEventListener("click", event => {
      this.openModal();
    });
    this.$closeModalButton.addEventListener("click", event => {
      this.closeModal();
    });
    this.$form.addEventListener("submit", event => {
      event.preventDefault();
      const title = this.$bookTitle.value;
      const author = this.$bookAuthor.value;
      const pages = this.$bookPages.value;
      const hasBook = title && author && pages;
      if (hasBook) {
        this.addBook({ title: title, author: author, pages: pages });
      } else {
        alert("please fill all fields");
      }
    });
  }
  openModal() {
    this.$modal.classList.add("open-modal");
  }
  closeModal() {
    this.$modal.classList.remove("open-modal");
    this.$bookTitle.value = "";
    this.$bookAuthor.value = "";
    this.$bookPages.value = "";
  }
  addBook({ title, author, pages }) {
    const newBook = {
      title,
      author,
      pages,
      id: this.books.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1 //If length of array is greater than 0, I'll get the ID of the previous element and add one.
    };
    this.books = [...this.books, newBook];
    this.displayCard();
    this.closeModal();
  }
  displayCard() {
    this.$books.innerHTML = this.books.map(
      book =>
        `
      <div class="book-card" data-id=${book.id}>
        <div class="book-info">
          <p class="book-title">${book.title}</p>
          <p class="book-author">Written by ${book.author}</p>
          <p class="book-pages">${book.pages} pages.</p>
          <button class="read-status-button">Read</button>
        </div>
        <div class="toolbar-container">
          <div class="toolbar">
            <button class="delete-book-button"><img src="https://icon.now.sh/delete"></button>
          </div>
        </div>
      </div>
      `
    );
  }
  deleteBook(event) {
    console.log("clicked");
    const selectedBook = event.target.closest(".book-card");
    console.log(selectedBook);
  }
}

new App();
