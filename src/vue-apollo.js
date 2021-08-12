import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Router from "./router";
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP || 'https://hasura.ecomarine.kz/v1/graphql'
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

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    // apollo options applied to all queries in components
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network',
    },
  },
  errorHandler (error) {
    // eslint-disable-next-line no-console
    console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    if (error.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
      onLogout();
      Router.push('/login')
    }
  },
})

// Install the vue plugin
Vue.use(VueApollo)

export default apolloProvider

// Manually call this when user log in
export async function onLogin (token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem('token', token)
  }
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token')
  }
  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  // try {
  //   await apolloClient.resetStore()
  // } catch (e) {
  //   // eslint-disable-next-line no-console
  //   console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  // }
}
