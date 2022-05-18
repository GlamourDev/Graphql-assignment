import { gql } from "@apollo/client";


const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export { LOGIN_MUTATION, SIGNUP_MUTATION };