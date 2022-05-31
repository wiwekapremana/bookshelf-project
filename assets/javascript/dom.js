const UNCOMPLETED_BOOK_CONTAINER = 'incompleteBookshelfList';
const COMPLETED_BOOK_CONTAINER = 'completeBookshelfList';

// Fungsi untuk menampilkan buku ke dalam html
function displayBook(id, title, author, year, isComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.setAttribute("id", id);
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const actionButtons = addActionButton(isComplete, id);

    textContainer.append(actionButtons);

    return textContainer;
}

// Fungsi untuk menambahkan data buku
function addBook() {
    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const book = displayBook(id, title, `Penulis: ${author}`, `Tahun: ${year}`, isComplete);
    const bookObject = composeBookObject(id, title, author, year, isComplete);

    books.push(bookObject);

    if (isComplete) {
        const container = document.getElementById(COMPLETED_BOOK_CONTAINER);
        container.append(book);
    } else {
        const container = document.getElementById(UNCOMPLETED_BOOK_CONTAINER);
        container.append(book);
    }
    updateStorage();
}

// Fungsi untuk membuat action button
function addActionButton(isComplete, id) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    const deleteButton = createDeleteButton(id);

    if (isComplete) {
        const uncompleteButton = createUncompleteButton(id);
        buttonContainer.append(uncompleteButton);
        buttonContainer.append(deleteButton);
    } else {
        const completeButton = createCompleteButton(id);
        buttonContainer.append(completeButton);
        buttonContainer.append(deleteButton);
    }
    return buttonContainer;
}

// Fungsi untuk membuat delete button
function createDeleteButton(id) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add('red', 'delete-button');
    deleteButton.innerText = "Hapus Buku";

    deleteButton.addEventListener("click", function() {
        const isConfirmed = confirm("Apakah benar ingin menghapus buku?");

        if (isConfirmed) {
            const book = document.getElementById(id);
            book.remove();
            alert("Berhasil Menghapus data");
            deleteBook(id);
            updateStorage();
        } else {
            alert("Gagal Menghapus data");
        }
    });

    return deleteButton;
}

//Fungsi untuk membuat button yang berfungsi memindahkan buku ke bagian sudah dibaca
function createCompleteButton(id) {
    const completeButton = document.createElement("button");
    completeButton.classList.add('green', 'complete-button');
    completeButton.innerText = "Pindahkan ke rak selesai dibaca";

    completeButton.addEventListener("click", function() {
        const bookContainer = document.getElementById(id);

        const title = bookContainer.querySelector(".book_item > h3").innerText;
        const author = bookContainer.querySelectorAll(".book_item > p")[0].innerText;
        const year = bookContainer.querySelectorAll(".book_item > p")[1].innerText;

        const book = displayBook(id, title, author, year, true);
        document.getElementById(COMPLETED_BOOK_CONTAINER).append(book);
        bookContainer.remove();
        for (let index = 0; index < books.length; index++) {
            if (books[index].id == id) {
                books[index].isComplete = true;
            }
        }
        updateStorage();
    });

    return completeButton;
}

//Fungsi untuk membuat button yang berfungsi memindahkan buku ke bagian belum selesai dibaca
function createUncompleteButton(id) {

    const uncompleteButton = document.createElement("button");
    uncompleteButton.classList.add('green', 'uncomplete-button');
    uncompleteButton.innerText = "Pindahkan ke rak buku belum selesai dibaca";

    uncompleteButton.addEventListener("click", function() {
        const bookContainer = document.getElementById(id);
        const title = bookContainer.querySelector(".book_item > h3").innerText;
        const author = bookContainer.querySelectorAll(".book_item > p")[0].innerText;
        const year = bookContainer.querySelectorAll(".book_item > p")[1].innerText;

        const book = displayBook(id, title, author, year, false);
        document.getElementById(UNCOMPLETED_BOOK_CONTAINER).append(book);
        bookContainer.remove();

        for (let index = 0; index < books.length; index++) {
            if (books[index].id == id) {
                books[index].isComplete = false;
            }
        }
        updateStorage();
    });

    return uncompleteButton;
}

//Fungsi untuk mencari buku berdasarkan judul buku
function searchBook() {
    const key = document.getElementById("searchBookTitle").value;
    const container = document.getElementById("searchBookList");
    container.innerHTML = '';
    if (key == '') {
        return;
    }
    for (let book of books) {
        if (book.title.toUpperCase().includes(key.toUpperCase())) {
            const bookTitle = document.createElement("h3");
            bookTitle.innerText = book.title;

            const bookAuthor = document.createElement("p");
            bookAuthor.innerText = `Penulis: ${book.author}`;

            const bookYear = document.createElement("p");
            bookYear.innerText = `Tahun: ${book.year}`;

            const status = document.createElement("p");

            if (book.isComplete) {
                status.classList.add("statusgreen");
                status.innerText = 'Status: Selesai dibaca';
            } else {
                status.classList.add("statusred");
                status.innerText = 'Status: Belum selesai dibaca';
            }

            const textContainer = document.createElement("article");
            textContainer.classList.add("book_item");
            textContainer.setAttribute("id", `buku-${book.id}`);

            textContainer.append(bookTitle, bookAuthor, bookYear, status);
            container.append(textContainer);

        }
    }
}