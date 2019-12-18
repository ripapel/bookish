import React, { Component } from 'react'
import SearchBox from './components/SearchBox/SearchBox'
import BooksGroup from './components/BooksGroup/BooksGroup'
import './App.css'
import { searchBooks } from './services/api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchTerm: ''
    }
  }


  handleSearch = (e) => {
    e.preventDefault()
    searchBooks({
      searchTerm: this.state.searchTerm,
      whenDoneStream: function (result) { this.setState({books: result}) }.bind(this)
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
        <SearchBox
          searchTerm={this.state.searchTerm}
          handleSearch={this.handleSearch}
          handleChangeSearchTerm={this.handleChangeSearchTerm}
        />
        <BooksGroup books={this.state.books} />
      </div>
    )
  }
}

export default App
