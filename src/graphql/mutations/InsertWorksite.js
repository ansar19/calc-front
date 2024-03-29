import gql from "graphql-tag"

const INSERT_WORKSITE = gql`
mutation InsertWorksite($name: String!, $company_id: uuid, $category_id: uuid) {
  insert_worksites_one(object: {
    name: $name
    company_id: $company_id
    category_id: $category_id
  }) {
    id
    name
    category {
      name
    }
  }
}
`

export default INSERT_WORKSITE
