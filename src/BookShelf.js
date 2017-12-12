import React, { Component } from 'react';
import { SHELF } from './constant';

class BookShelf extends Component {
  handleOnChange = (book, event) => {
    return this.props.onRelocateBook(book, event.target.value);
  }

  render() {
    const { shelfTitle, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        {books && books.length !== 0 && (
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
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
                            onChange={this.handleOnChange.bind(this, book)}>
                            <option value="none" disabled>Move to...</option>
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
}

export default BookShelf;