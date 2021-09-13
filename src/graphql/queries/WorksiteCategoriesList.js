import gql from "graphql-tag"

const WORKSITE_CATEGORIES = gql`
query Categories {
  worksite_categories {
    id
    name
  }
}
`

export default WORKSITE_CATEGORIES
