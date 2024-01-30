import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      user {
        firstName
        lastName
        role
				email
				phoneNumber
				address
      }
      accessToken
    }
  }
`;