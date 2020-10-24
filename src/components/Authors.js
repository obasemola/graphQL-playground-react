import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORNYEAR } from '../queries/queries'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ setBornTo, setsetBornTo ] = useState('')
  const [ editBorn ] = useMutation(EDIT_BORNYEAR)

  if (!props.show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()

    editBorn({ variables: { name, setBornTo } })

    setName('')
    setsetBornTo('')

    console.log(name)
    console.log(setBornTo)
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birth year</h2>
      <form onSubmit={submit}>
        <div>
          name: <input onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          born: <input onChange={(e) => setsetBornTo(Number(e.target.value))}/>
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
