import gql from "graphql-tag"

const COMPANY_TYPES = gql`
query CompanyTypes {
  company_types {
    id
    name
    short_name
  }
}
`

export default COMPANY_TYPES
