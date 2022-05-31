const checkbox = document.getElementById('inputBookIsComplete');
const bookshow = document.getElementById('bookshow');
const button_cancel = document.getElementById('bookCancel');
const input_section = document.querySelector(".input_section");
const status_msg = document.getElementById('status');

document.addEventListener("DOMContentLoaded", function() {

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            status_msg.innerText = 'Buku selesai dibaca';
        } else {
            status_msg.innerText = 'Buku belum selesai dibaca';
        }
    });

    const submitForm = document.getElementById("inputBook");
    const searchForm = document.getElementById("searchBook")

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        getDataFromStorage();
    }

});

// event untuk memunculkan display penginputan  buku 
bookshow.addEventListener("click", function() {
    input_section.style.display = "flex";
});

button_cancel.addEventListener("click", function() {
    input_section.style.display = "none";
});

document.addEventListener("ondataloaded", () => {
    displayDataFromStorage();
});