import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../queries/queries'
import { GET_RECOMMENDATIONS } from '../queries/queries'

const Recommend = (props) => {

  const [getUser, { loading, data }] = useLazyQuery(GET_USER)
  const [getRecommendations, {loading: recloading, data: result}] =  useLazyQuery(GET_RECOMMENDATIONS)
  
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if(data){
      getRecommendations({ variables: { genre: data.me.favouriteGenre } })
    }
    
  }, [data])
  


  if(!props.show){
    return null
  }

  if(loading){
    return null
  }

  const userResult = data.me

  if(recloading){
    return null
  }


  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre <b>{userResult.favouriteGenre}</b></p>
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
          {result.recommendations.map((recommendation) => {
            return <tr key={recommendation.title}>
                    <td>{recommendation.title}</td>
                    <td>{recommendation.author.name}</td>
                    <td>{recommendation.published}</td>
                   </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend