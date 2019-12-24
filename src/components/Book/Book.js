import React from 'react'
import './book.css'


const Description = function (props) {
    const { book } = props
    return (
        <section className={props.showDescription ? 'book-description' : 'book-description-hidden'}>
            <h1 className="book-description-title">{book.title}</h1>
            <p className="book-description-author">by {book.author.name}, <span className="book-description-date">{book.releaseYear}</span></p>
            <p className="book-description-paragraph" dangerouslySetInnerHTML={{ __html: book.description }}></p>
        </section>
    )
}

export default class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDescription: false
        }
    }

    componentDidMount() {
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
                <div onMouseEnter={this.toggleShowDescription} onMouseLeave={this.toggleShowDescription}>
                    <img src={book.image_url} alt="book cover" className="cover" />
                    <Description book={book} showDescription={this.state.showDescription} />
                </div>
                <h1 className="title">{book.title}</h1>
                <h2 className="author">{book.author.name}</h2>
                <button type="button" className="btn-primary">Want to Read</button>

            </section>
        )
    }
}

