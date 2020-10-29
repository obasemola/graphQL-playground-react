
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'



const App = () => {
  const [page, setPage] = useState('authors')
  const [ token, setToken ] = useState(null)
  const [loggedinUser, setLoggedinUser] = useState('')
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setToken(token)
  }, [])


  if(authorResult.loading){
    return null
  }
  if(bookResult.loading){
    return null
  }

  // console.log(bookResult)


  const loginPageShow = () => {
    setPage('login')
  }

  const handleLogOut = () => {
    setToken(null)
    setPage('login')
    localStorage.clear()
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