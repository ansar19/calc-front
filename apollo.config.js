const path = require('path')


// Load .env files
const { loadEnv } = require('vue-cli-plugin-apollo/utils/load-env')
const env = loadEnv([
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '.env.local')
])

module.exports = {
  client: {
    service: 'calc-example',
    url: 'https://hasura.ecomarine.kz/v1/graphql',
    includes: ["./src/**/*.{js,ts,vue,gql}"],
    excludes: ["**/__tests__/**"],
    // headers: {
    //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iLCJmaW5hbmNlIiwiaHIiXSwieC1oYXN1cmEtdXNlci1pZCI6IjEifSwiaWF0IjoxNjIzMDY2NzE3LCJleHAiOjE2MjMxNTMxMTd9.-VsvigxDUQObYXGL7hBT9SJk1k8xNZLN998RN4-Scro'
    // },
    // // optional disable SSL validation check
    // skipSSLValidation: true,
  },
  service: {
    name: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    localSchemaFile: path.resolve(__dirname, './schema.json')
    // localSchemaFile: './schema.graphql'

    // localSchemaFile: '/Users/madirys/code/ecomarine/app/calc-front/schema.graphql'
  },
  engine: {
    endpoint: process.env.APOLLO_ENGINE_API_ENDPOINT || 'https://hasura.ecomarine.kz/v1/graphql',
    apiKey: env.VUE_APP_APOLLO_ENGINE_KEY || 'hasecret'
  }
}
