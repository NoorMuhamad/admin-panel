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


const UPDATE_USER = gql`
mutation updateUser ($updateUserType: UpdateUserType!) {
    updateUser (updateUserType: $updateUserType) {
        id
        firstName
        lastName
        cnic
        password
        email
        phoneNumber
        role
        address
    }
}
`;

const CREATE_USER = gql`
mutation createUser ($createUserType: CreateUserType!) {
    createUser (createUserType: $createUserType) {
        id
        firstName
        lastName
        password
        email
        phoneNumber
        role
        address
        createdAt
        updatedAt
    }
}
`;

const DELETE_USER = gql`
mutation deleteUser ($id: String!) {
    deleteUser (id: $id) {
        success
        message
    }
}
`;


export { GET_USERS, UPDATE_USER, CREATE_USER, DELETE_USER };