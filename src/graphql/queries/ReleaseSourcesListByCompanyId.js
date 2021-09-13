import gql from 'graphql-tag'

const RS_LIST = gql`
query ReleaseSources ($company_id: uuid!) {
  release_sources(where: {emission_source: {facility_location: {facility: {worksite: {company_id: {_eq: $company_id}}}}}}) {
    id
    name
    number
    inventory_number
    emission_source {
      id
      name
      number
      inventory_number
      organized
      product
      facility_location {
        id
        name
        facility {
          id
          name
          worksite {
            id
            name
            category {
              id
              name
            }
          }
        }
      }
    }
  }
}
`

export default RS_LIST
