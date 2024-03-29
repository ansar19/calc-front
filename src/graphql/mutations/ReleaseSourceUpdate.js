import gql from 'graphql-tag'

const UPDATE_RELEASE_SOURCE_BY_PK = gql`
mutation ReleaseSourceUpdate ($id: uuid!, $name: String!, $number: String!, $inventory_number: String!, $ghg_source: Boolean!, $emission_src_id: uuid! ) {
  update_release_sources_by_pk(pk_columns: {id: $id},
    _set: {
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
  }
}
`

export default UPDATE_RELEASE_SOURCE_BY_PK
