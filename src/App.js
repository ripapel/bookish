import React, { Component } from 'react'
import SearchBox from './components/SearchBox/SearchBox'
import BooksGroup from './components/BooksGroup/BooksGroup'
import CategoriesNav from './components/CategoriesNav/CategoriesNav'
import Header from './components/Header/Header'
import './App.css'
import { searchBooks, getAuthor } from './services/api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchTerm: '',
      loading: false,
      authors: {}
    }
  }

  setAuthor = author => {
    if (this.state.authors[author.id])
      return
    const authors = this.state.authors
    authors[author.id] = author
    this.setState({
      authors: authors
    })
  }

  setBookDescription = ({ author, bookId }) => {
    const books = this.state.books
    const bookIndex = books.findIndex(b => b.id === bookId)
    const book = books[bookIndex]
    const authorBook = author.books.find(b => b.id === bookId)
    const description = authorBook ? authorBook.description : undefined
    book.description = description ? description : 'No description available'
    books[bookIndex] = book
    this.setState({
      books: books
    })
  }

  getBookDescription = ({ authorId, bookId }) => {
    if (this.state.authors[authorId]) {
      this.setBookDescription({
        author: this.state.authors[authorId],
        bookId
      })
      return
    }

    else {
      const whenDoneStream = function (result) {
        this.setAuthor(result)
        this.setBookDescription({ author: result, bookId })
      }.bind(this)

      getAuthor({
        id: authorId,
        whenDoneStream: whenDoneStream
      })
    }
  }


  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    searchBooks({
      searchTerm: this.state.searchTerm,
      whenDoneStream: function (result) { this.setState({ books: result }) }.bind(this),
      toggleLoading: this.toggleLoading
    })
  }

  handleChangeSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <div className="App" >
        <Header />
        <div className="home-page-inner">
          <SearchBox
            searchTerm={this.state.searchTerm}
            handleSearch={this.handleSearch}
            handleChangeSearchTerm={this.handleChangeSearchTerm}
          />
          <div className="row space-between">
            <BooksGroup books={this.state.books} loading={this.state.loading} getBookDescription={this.getBookDescription} />
            <CategoriesNav />
          </div>
        </div>
      </div>
    )
  }
}

export default App
