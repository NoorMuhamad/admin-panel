import { gql } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query Customers($page: Int!, $limit: Int!, $sortBy: String, $sortOrder: String!, $search: String) {
    customers(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search) {
      data {
        id
        firstName
        lastName
        cnic
        email
        phoneNumber
        createdAt
      }
      totalPages
      currentPage
    }
  }
`;


const UPDATE_CUSTOMER = gql`
mutation updateCustomer ($updateCustomerType: UpdateCustomerType!) {
    updateCustomer (updateCustomerType: $updateCustomerType) {
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

const CREATE_CUSTOMER = gql`
mutation createCustomer ($createCustomerType: CreateCustomerType!) {
    createCustomer (createCustomerType: $createCustomerType) {
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

const DELETE_CUSTOMER = gql`
mutation deleteCustomer ($id: String!) {
    deleteCustomer (id: $id) {
        success
        message
    }
}
`;


export { GET_CUSTOMERS, UPDATE_CUSTOMER, CREATE_CUSTOMER, DELETE_CUSTOMER };