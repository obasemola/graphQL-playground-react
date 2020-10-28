import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  if (!props.show) {
    return null
  }

  let initialGenres = []
  props.books.map((book) => initialGenres = initialGenres.concat(book.genres))
  const genres = [...new Set(initialGenres)]

  let books = props.books.map((book) => {
    if(book.genres.includes(genre)){
      return book
    } else {
      return null
    }
  })

  const returnedBooks = books.filter((book) => book !== null)
  books = genre === 'all genres' ? props.books : returnedBooks

  console.log(genre)
  console.log(books)


  // console.log(initialGenres)
  // console.log(genres)

  const genreClick = (e) => {
    // console.log(e.target.name)
    setGenre(e.target.name)
  }



  return (
    <div>
      <h2>books</h2>
      <p>in genre {<b>{genre}</b>}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((genre) => <button onClick={genreClick} name={genre} key={genre}>{genre}</button>)}
      <button>all genres</button>
    </div>
  )
}

export default Books