import React from 'react'
import './book.css'

export default class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDescription: false,
            description: undefined
        }
    }

    componentDidMount(){
        this.props.getBookDescription()
    }

    toggleShowDescription = () => {
        const showDescription = !this.state.showDescription
        this.setState({
            showDescription: showDescription
        })
    }

    render() {
        const { book } = this.props
        return (
            <section className="book">
                <img src={book.image_url} alt="book cover" className="cover" onMouseEnter={this.toggleShowDescription} onMouseLeave={this.toggleShowDescription} />
                <h1 className="title">{book.title}</h1>
                <h2 className="author">{book.author.name}</h2>
                <button type="button" className="btn-primary">Want to Read</button>
                <div className={this.state.showDescription ? 'book-description' : 'book-description-hidden'}>

                </div>
            </section>
        )
    }
}

