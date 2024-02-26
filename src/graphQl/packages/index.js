import { gql } from '@apollo/client';

const GET_PACKAGES = gql`
  query Packages($page: Int!, $limit: Int!, $sortBy: String, $sortOrder: String!, $search: String) {
    packages(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder, search: $search) {
      data {
       	id
	      name
	      monthlyFee
	      speed
	      isActive
        createdAt
      }
      totalPages
      currentPage
    }
  }
`;


const UPDATE_PACKAGE = gql`
mutation updatePackage ($updatePackageType: UpdatePackageType!) {
    updatePackage (updatePackageType: $updatePackageType) {
        name
	      monthlyFee
	      speed
	      isActive
    }
}
`;

const CREATE_PACKAGE = gql`
mutation createPackage ($createPackageType: CreatePackageType!) {
    createPackage (createPackageType: $createPackageType) {
        name
	      monthlyFee
	      speed
	      isActive
        createdAt
        updatedAt
    }
}
`;

const DELETE_PACKAGE = gql`
mutation deletePackage ($id: String!) {
    deletePackage (id: $id) {
        success
        message
    }
}
`;


export { GET_PACKAGES, UPDATE_PACKAGE, CREATE_PACKAGE, DELETE_PACKAGE };