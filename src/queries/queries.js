import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
  }
}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`

export const GET_RECOMMENDATIONS = gql`
  query getRecommendations($genre: String!){
    recommendations(genre: $genre) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author{
      name
      born
    }
    genres
  }
}
`

export const EDIT_BORNYEAR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login ($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`