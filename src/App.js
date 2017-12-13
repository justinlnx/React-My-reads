import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import Search from './Search';
import { SHELF } from './constant';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchResult: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  get getBookShelfContents() {
    return [
      {
        title: SHELF.CURRENTLY_READING,
        books: this.state.books.filter(x => x.shelf === 'currentlyReading')
      },
      {
        title: SHELF.WANT_TO_READ,
        books: this.state.books.filter(x => x.shelf === 'wantToRead')
      },
      {
        title: SHELF.READ,
        books: this.state.books.filter(x => x.shelf === 'read')
      },
    ];
  };

  moveBook = (book, shelf) => {
    var current = this.state.books;
    var foundBook = current.find((value) => {
      return value.id === book.id
    });
    if (foundBook !== undefined) {
      foundBook.shelf = shelf;
    } else {
      book['shelf'] = shelf;
      current.push(book);
    }

    this.setState({
      books: current
    });
  };
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.getBookShelfContents.map((item, index) => (
                <BookShelf 
                  key={index + 1}
                  shelfTitle={item.title}
                  books={item.books}
                  onRelocateBook={this.moveBook} />
              ))}
            </div>
            <div className="open-search" >
              <Link to='/search' className="open-search"></Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <Search userBooks={this.state.books} onRelocateBook={this.moveBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
