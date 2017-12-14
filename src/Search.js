import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: [],
  };

  updateQuery = (query) => {
    if (query) {
      BooksAPI.search(query).then(res => {
        if (!res.error) {
          this.props.userBooks.map(userBook => {
            var book = res.find(item => {
              return item.id === userBook.id;
            });
            if (book !== undefined) {
              book['shelf'] = userBook.shelf;
            }
            return userBook;
          });
        }

        this.setState({
          query: query,
          books: res.error ? [] : res,
        });
      });
    } else {
      this.setState({
        query: '',
        books: [],
      })
    }
  };

  moveBook = (book, shelf) => {
    this.props.onRelocateBook(book, shelf);
    var current = this.state.books;
    var foundBook = current.find((value) => {
      return value.id === book.id
    });
    if (foundBook !== undefined) {
      foundBook.shelf = shelf;
    }

    this.setState({
      books: current
    });
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf 
            shelfTitle={''}
            books={books}
            onRelocateBook={this.moveBook}/>
        </div>
      </div>
    );
  };
}

export default Search;
