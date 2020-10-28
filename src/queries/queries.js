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
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    published: $published,
    title: $title,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author
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