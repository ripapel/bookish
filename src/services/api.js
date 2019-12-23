const converter = require('xml-js')

const api = {
    key: '1i2mJaTYLxWaOJNzN1Yf1g',
    secret: 'w1y3wEie54IU2E7ZM3M9Mb0whtFx6fvju8tFVlNjk',
    proxyURL: 'https://el-patron-cors.herokuapp.com/'
}


const searchBooks = ({ searchTerm, whenDoneStream, toggleLoading }) => {
    toggleLoading();
    (async () => {
        const fetchedResouce =
            fetch(`${api.proxyURL}https://www.goodreads.com/search/index.xml?key=${api.key}&q=${searchTerm}`)
        const reader = (await fetchedResouce).body.getReader()
        const decoder = new TextDecoder('utf-8')
        let result = ''

        const format = response => {
            const work = JSON.parse(response).GoodreadsResponse.search.results.work

            if (work === undefined)
                return []

            return work.map(w => {
                return {
                    id: w.best_book.id._text,
                    releaseYear: w.original_publication_year._text,
                    title: w.best_book.title._text,
                    author: {
                        id: w.best_book.author.id._text,
                        name: w.best_book.author.name._text
                    },
                    image_url: w.best_book.image_url._text,
                }
            })
        }


        reader.read().then(function processText({ done, value }) {
            if (done) {
                result = converter.xml2json(result, { compact: true, spaces: 4 })
                whenDoneStream(format(result))
                toggleLoading()
                return
            }

            result += decoder.decode(value)
            return reader.read().then(processText)
        })

    })()
}

const getAuthor = ({ id, whenDoneStream }) => {
    (async () => {
        const fetchedResouce =
            fetch(`${api.proxyURL}https://www.goodreads.com/author/show.xml?key=${api.key}&id=${id}`)

        const reader = (await fetchedResouce).body.getReader()
        const decoder = new TextDecoder('utf-8')

        let result = ''

        const format = response => {
            console.log(response.books)
            const format = book => {
                return {
                    id: book.id._text,
                    description: book.description._text
                }
            }

            return {
                id: response.id._text,
                name: response.name._text,
                books: Array.from(response.books.book).map(b => format(b))
            }
        }

        reader.read().then(function processText({ done, value }) {
            if (done) {
                result = converter.xml2json(result, { compact: true, spaces: 4 })
                const json = JSON.parse(result).GoodreadsResponse.author
                const author = format(json)
                whenDoneStream(author)
                return
            }

            result += decoder.decode(value)
            return reader.read().then(processText)
        })
    })()
}


export { searchBooks, getAuthor }


