import { gql } from "@apollo/client";


const GET_POSTS = gql`
  query ($items: Int!, $page: Int!) {
    getPostsList(pagination: { items: $items, page: $page }) {
      posts {
        title
        id
        description
      }
      total
    }
  }
`;


export { GET_POSTS };