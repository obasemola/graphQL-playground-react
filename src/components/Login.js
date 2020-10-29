import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      // setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      localStorage.setItem('userToken', token)
      console.log(token)
      props.setToken(token)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
      .then((result) => localStorage.setItem('userToken', props.token))

    props.setPage('authors')
    setUsername('')
    setPassword('')


  }

  if(!props.show){
    return null
  }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          name <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
  
}


export default Login