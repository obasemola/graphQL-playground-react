import React from 'react'

const Recommend = (props) => {

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
          {props.recommendations.map((recommendation) => {
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