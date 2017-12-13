import React from 'react';
import { SHELF } from './constant';

const BookShelf = function(props) {
  const handleOnChange = (book, event) => {
    return props.onRelocateBook(book, event.target.value);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      {props.books && props.books.length !== 0 && (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book) => (
              <li key={book.id} className='book-list-item' >
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                        style={
                          { width: 128, height: 193,
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` 
                          }
                        }>
                      </div>
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf ? book.shelf : 'none'}
                          onChange={handleOnChange.bind(this, book)}>
                          <option value="moveTo" disabled>Move to...</option>
                          <option value="currentlyReading">{SHELF.CURRENTLY_READING}</option>
                          <option value="wantToRead">{SHELF.WANT_TO_READ}</option>
                          <option value="read">{SHELF.READ}</option>
                          <option value="none">{SHELF.NONE}</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && book.authors.map((author, index) => (
                      <div className="book-authors" key={index}>{author}</div>
                    ))}
                  </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default BookShelf;
