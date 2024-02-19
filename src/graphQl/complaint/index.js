import { gql } from '@apollo/client';

const GET_COMPLAINTS = gql`
  query Complaints($page: Int!, $limit: Int!, $sortBy: String, $sortOrder: String!, $search: String) {
    complaints(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search) {
      data {
        id
        subject
        description
        status
        createdAt
      }
      totalPages
      currentPage
    }
  }
`;


const UPDATE_COMPLAINT = gql`
mutation updateComplaint ($updateComplaintType: UpdateComplaintType!) {
    updateComplaint (updateComplaintType: $updateComplaintType) {
      id
      subject
      description
      status
    }
}
`;

const CREATE_COMPLAINT = gql`
mutation createComplaint ($createComplaintType: CreateComplaintType!) {
    createComplaint (createComplaintType: $createComplaintType) {
      id
      subject
     	description
      status
      createdAt
      updatedAt
    }
}
`;

const DELETE_COMPLAINT = gql`
mutation deleteComplaint ($id: String!) {
    deleteComplaint (id: $id) {
        success
        message
    }
}
`;


export { GET_COMPLAINTS, UPDATE_COMPLAINT, CREATE_COMPLAINT, DELETE_COMPLAINT };