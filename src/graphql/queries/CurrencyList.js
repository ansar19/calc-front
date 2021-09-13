import gql from "graphql-tag"

const CURRENCIES = gql`
query Currencies {
  currencies {
    id
    name
    short_name
  }
}
`

export default CURRENCIES
