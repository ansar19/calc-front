import gql from "graphql-tag"

const ADD_RELEASE_SOURCE_BY_PK = gql`
mutation AddReleaseSource($name: String, $number: String, $inventory_number: String, $ghg_source: Boolean, $emission_src_id: uuid) {
  insert_release_sources_one(object: {
    name: $name,
    number: $number,
    inventory_number: $inventory_number,
    ghg_source: $ghg_source,
    emission_src_id: $emission_src_id
    }) {
    id
    name
    number
    inventory_number
    ghg_source
    emission_src_id
    emission_source {
      id
      name
      number
      inventory_number
      organized
      product
      description
      filters {
        id
        name
        description
      }
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

export default ADD_RELEASE_SOURCE_BY_PK
