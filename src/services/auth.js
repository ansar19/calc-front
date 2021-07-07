import { apolloClient } from '@/vue-apollo'
import LOGIN from '@/graphql/Login.gql'
import jwtDecode from 'jwt-decode'

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://hasura.ecomarine.kz/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const loginDoc = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
      email
      role
    }
  }
`;

function executeLogin(email, password) {
  return fetchGraphQL(
    loginDoc,
    "login",
    { "email": email, "password": password }
  );
}

export async function login(email, password) {
  const { errors, data } = await executeLogin(email, password);

  if (errors) {
    console.error(errors);
  }

  const { token, ...user } = data.login
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}


export const logout = () => {
  localStorage.removeItem("token")
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  if (token) {
    const { exp } = jwtDecode(token)
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token")
    }
    return exp * 1000 > Date.now()
  }
  return false
}
