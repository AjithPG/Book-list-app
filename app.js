//Book class:Represent a Book
class Book{
    constructor(title,author,isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
}
//UI class :Handle UI tasks
class UI{
    static displayBooks(){
        const StoredBooks = [
           {
               title:'Book One',
               author:'John Doe',
               isbn:'3434343'
           },
           {

               title:'Book two',
               author:'John Doe',
               isbn:'454545'
           }
        ];
      const books = StoredBooks;

      books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        var list = document.querySelector('#book-list');
        var row = document.createElement('tr');

        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm "><i class="fas fa-times-circle delete"></i></a></td>
        `;

        list.appendChild(row);

    }

    static deleteBook(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.parentElement.remove();
      }
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div,form);

        //vanish in 3 sec

        setTimeout(()=>document.querySelector('.alert').remove(),3000);

    }
    static clearFields(){
        document.querySelector('#title').value = '';
        
        document.querySelector('#author').value = '';
        
        document.querySelector('#isbn').value = '';
    }
}
//Store class:Handle Storage
//Event:Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event:Add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    //Get Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    //validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all the field','danger');
    } else{
    //Instatiate Book
    const book = new Book(title,author,isbn);

    //Add books to UI
    UI.addBookToList(book);

    //show  success alert

    UI.showAlert('New Book Added','success');
    
    //clear field
    UI.clearFields();
    }


});

//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click',(e) => {

UI.deleteBook(e.target);

UI.showAlert('Book Deleted','danger');

});

