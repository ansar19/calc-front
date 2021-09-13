import gql from "graphql-tag"

const WORKSITES = gql`
query Worksites($company_id: uuid!) {
  worksites(where: {company_id: { _eq: $company_id }}) {
    id
    name
    category {
      id
      name
    }
  }
}
`

export default WORKSITES
