import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'



const App = () => {
  const [page, setPage] = useState('authors')
  const [ token, setToken ] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setToken(token)
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })


  //Both check if data is still loading otherwise, it will return undefined
  if(authorResult.loading){
    return null
  }
  if(bookResult.loading){
    return null
  }

  //setting recommendations with React
  // const recommendations = bookResult.data.allBooks.filter((book) => {
  //   return book.genres.includes(userResult.favouriteGenre)
  // })

  // console.log(recommendations)


  // console.log(bookResult)

  const loginPageShow = () => {
    setPage('login')
  }

  const handleLogOut = () => {
    setToken(null)
    setPage('login')
    localStorage.clear()
    client.resetStore()
  }

  // console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null && <button onClick={() => setPage('add')}>add book</button>}
        {token !== null && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token === null && <button onClick={loginPageShow}>login</button>}
        {token !== null && <button onClick={handleLogOut}>logout</button>}
      </div>

      <Authors
        authors={authorResult.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={bookResult.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommend
      show={page === 'recommend'}
    />

    </div>
  )
}

export default App