import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries/queries'

const Recommend = (props) => {
  const user = useQuery(GET_USER)

  if(user.loading){
    return null
  }

  console.log(user)

  if(!props.show){
    return null
  }


  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre</p>
    </div>
  )
}

export default Recommend