let addBookBtn = document.querySelector('.btn')
let bookTitle = document.querySelector('#title')
let authorBook = document.querySelector('#author')
let bookYear = document.querySelector('#year')
let booksContainer = document.querySelector('.table')
let clearAllList = document.querySelector('#clear_all')

let booksArray = []

addBookBtn.addEventListener('click', function (event) {
    event.preventDefault()

    if (bookTitle.value == '' || authorBook.value == '' || bookYear.value == '') {
        alert('لطفا همه ورودی هارا پر کنید')
    }
    else {
        let newBookObj = {
            title: bookTitle.value,
            author: authorBook.value,
            year: bookYear.value,
        }
        booksArray.push(newBookObj)
    }


    setIntoLocalStorage(booksArray)
    bookListGenerator(booksArray)
})
function setIntoLocalStorage(allBooksArray) {
    localStorage.setItem('books', JSON.stringify(allBooksArray))
}
function bookListGenerator(allBooksArray) {

    booksContainer.insertAdjacentHTML('beforeend', '')

    let getItemsLocal = JSON.parse(localStorage.getItem('books'))
    allBooksArray = getItemsLocal

    allBooksArray.forEach(book => {
        booksContainer.insertAdjacentHTML('beforeend',
            '<tr><th>' + book.title + ' </th><th>' + book.author + '</th><th>' + book.year + '</th></tr>'
        )
    });

    bookTitle.value = ''
    authorBook.value = ''
    bookYear.value = ''

}
function getLocalStorage() {
    let getItem = JSON.parse(localStorage.getItem('books'))
    if (getItem) {
        booksArray = getItem
    }
    else {
        booksArray = []
    }

    bookListGenerator(booksArray)
}
function clearLiat() {
    localStorage.removeItem('books')
    booksArray = []
    bookListGenerator(booksArray)
}

window.addEventListener('load', getLocalStorage)
clearAllList.addEventListener('click', clearLiat)
