import gql from "graphql-tag"

const UPDATE_WORKSITE = gql`
mutation UpdateWorksite($id: uuid!, $category_id: uuid!, $company_id: uuid! $name: String!) {
  update_worksites_by_pk(
    pk_columns: { id: $id},
    _set: {
    	name: $name,
      company_id: $company_id,
      category_id: $category_id
  	}
  ) {
    id
    name
    category {
      id
      name
    }
  }
}
`

export default UPDATE_WORKSITE
