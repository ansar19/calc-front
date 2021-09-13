import gql from "graphql-tag"

const RELEASE_SOURCES_LIST_CALC = gql`
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
      filters {
        id
        name
      }
    }
  }
}
`

export default RELEASE_SOURCES_LIST_CALC
