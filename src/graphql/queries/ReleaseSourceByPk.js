import gql from 'graphql-tag'

const RELEASE_SOURCE_BY_PK = gql`
query ReleaseSourceByPk ($id: uuid!) {
  release_sources_by_pk(id: $id) {
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
export default RELEASE_SOURCE_BY_PK
