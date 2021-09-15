import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'https://hasura.ecomarine.kz/v1/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token")
  operation.setContext(( { headers = {} }) => ({
    headers: token ? {
      ...headers,
      authorization: `Bearer ${token}`
    } :
    {
      ...headers,
    }
  }));
  return forward(operation)
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  connectToDevTools: true,
})

export default apolloClient;
