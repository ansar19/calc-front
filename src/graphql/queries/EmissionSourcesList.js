import gql from "graphql-tag"

const EMISSION_SOURCES_LIST = gql`
query EmissionSources {
  emission_sources {
    id
    name
    number
    inventory_number
    organized
    product
    description
    organized
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
`

export default EMISSION_SOURCES_LIST
