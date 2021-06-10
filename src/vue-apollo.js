import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Router from "./router";
// import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

// Name of the localStorage item
const AUTH_TOKEN = 'token'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP || 'https://hasura.ecomarine.kz/v1/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(( { headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'Bearer ' + localStorage.getItem(AUTH_TOKEN) || null,
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
  defaultClient: apolloClient
})

// Install the vue plugin
Vue.use(VueApollo)

export default apolloProvider

// // Config
// const defaultOptions = {
//   // You can use `https` for secure connection (recommended in production)
//   httpEndpoint,
//   // You can use `wss` for secure connection (recommended in production)
//   // Use `null` to disable subscriptions
//   // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:3000/graphql',
//   wsEndpoint: null,
//   // LocalStorage token
//   tokenName: AUTH_TOKEN,
//   // Enable Automatic Query persisting with Apollo Engine
//   persisting: false,
//   // Use websockets for everything (no HTTP)
//   // You need to pass a `wsEndpoint` for this to work
//   websocketsOnly: false,
//   // Is being rendered on the server?
//   ssr: false,

//   // Override default apollo link
//   // note: don't override httpLink here, specify httpLink options in the
//   // httpLinkOptions property of defaultOptions.
//   // link: myLink

//   // Override default cache
//   // cache: myCache

//   // Override the way the Authorization header is set
//   // getAuth: (tokenName) => ...

//   // Additional ApolloClient options
//   // apollo: { ... }

//   // Client local data (see apollo-link-state)
//   // clientState: { resolvers: { ... }, defaults: { ... } }
// }

// // Call this in the Vue app file
// export function createProvider (options = {}) {
//   // Create apollo client
//   const { apolloClient, wsClient } = createApolloClient({
//     ...defaultOptions,
//     ...options,
//   })
//   apolloClient.wsClient = wsClient

//   // Create vue apollo provider
//   const apolloProvider = new VueApollo({
//     defaultClient: apolloClient,
//     defaultOptions: {
//       $query: {
//         // fetchPolicy: 'cache-and-network',
//       },
//     },
//     errorHandler (error) {
//       // eslint-disable-next-line no-console
//       console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
//       if (error.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
//         onLogout();
//         Router.push('/login')
//       }
//     },
//   })

//   return apolloProvider
// }

// Manually call this when user log in
export async function onLogin (token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  // try {
  //   await apolloClient.resetStore()
  // } catch (e) {
  //   // eslint-disable-next-line no-console
  //   console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  // }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem('vuex')
  }
  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  // try {
  //   await apolloClient.resetStore()
  // } catch (e) {
  //   // eslint-disable-next-line no-console
  //   console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  // }
}
