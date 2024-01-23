import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      user {
        username
        role
				email
				phoneNumber
				address
      }
      accessToken
    }
  }
`;