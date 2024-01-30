import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users($page: Int!, $limit: Int!, $sortBy: String, $sortOrder: String!, $search: String) {
    users(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search) {
      data {
        id
        firstName
        lastName
        cnic
        password
        email
        phoneNumber
        role
        address
        createdAt
      }
      totalPages
      currentPage
    }
  }
`;

export default GET_USERS;