import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_RECOMMENDATIONS } from '../queries/queries'

const Recommend = (props) => {

  const recommendations =  useQuery(GET_RECOMMENDATIONS, {
    variables: { genre: props.userResult.favouriteGenre }
  })

  if(!props.show){
    return null
  }


  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre <b>{props.userResult.favouriteGenre}</b></p>
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
          {recommendations.data.recommendations.map((recommendation) => {
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