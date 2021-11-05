import gql from "graphql-tag"

const LIMIT_PERMISSIONS = gql`
query LimitPermissions($company_id: uuid!) {
  limit_permissions(where: { company_id: { _eq: $company_id }}) {
    id
    number
    name
    description
    start_date
    end_date
    t_year_limit
  }
}
`

export default LIMIT_PERMISSIONS
