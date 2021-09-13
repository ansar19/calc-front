import gql from "graphql-tag"

const DEPARTMENTS = gql`
query CompanyDepartments {
  company_departments{
    id
    name
  }
}
`

export default DEPARTMENTS
