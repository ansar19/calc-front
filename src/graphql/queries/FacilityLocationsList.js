import gql from "graphql-tag"

const FACILITY_LOCATIONS = gql`
query FacilityLocations {
  facility_locations {
    id
    name
  }
}
`

export default FACILITY_LOCATIONS
