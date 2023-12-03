import React from 'react';
import  gql  from 'apollo-server-express';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
    }
  }
}
`;

export

const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export

const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export

const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    savedBooks {
      bookId
      title
      authors
      description
      image
    }
  }
}
`;