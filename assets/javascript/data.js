const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

// Fungsi untuk mengecek availability local storage browser
function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser tidak mendukung local storage");
        return false
    }
    return true;
}

// Fungsi untuk save data ke local storage
function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// fungsi untuk Mengambil data dari storage
function getDataFromStorage() {
    const storageData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(storageData);

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

// Fungsi untuk update storage data jika browser punya storage
function updateStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

// Fungsi untuk membuat informasi menjadi object sebelum di simpan ke storage
function composeBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
}

// Fungsi untuk menghapus buku berdasarkan id
function deleteBook(id) {

    for (let index = 0; index < books.length; index++) {

        if (books[index].id == id) {
            books.splice(index, 1);
        }
    }
}

// Fungsi untuk menampilkan data yang terdapat dalam storage
function displayDataFromStorage() {

    for (let book of books) {
        const newBook = displayBook(book.id, `Judul Buku: ${book.title}`, `Penulis: ${book.author}`, `Tahun: ${book.year}`, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETED_BOOK_CONTAINER).append(newBook);
        } else {
            document.getElementById(UNCOMPLETED_BOOK_CONTAINER).append(newBook);
        }
    }
}