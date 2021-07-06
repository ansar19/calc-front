import { apolloClient } from '@/vue-apollo'
import LOGIN from '@/graphql/Login.gql'
import jwtDecode from 'jwt-decode'

export const logout = () => {
  localStorage.removeItem("token")
}

export const login = async (email, password) => {
  try {
    const { data } = await apolloClient.mutate({ mutation: LOGIN, variables: { email: email, password: password, } })
    const { token, ...user } = data.login
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  } catch (e) {
    console.error(e);
  }
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
