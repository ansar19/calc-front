import gql from "graphql-tag"

const ADD_AIR_CALC = gql`
mutation AddCalc(
  $release_source_id: uuid,
  $type: String!,
  $calc_method: Int!,
  $start_date: date,
  $end_date: date,
  $calc_pollutants: [air_calculation_pollutant_insert_input!]!) {
  insert_air_calculations_one(object: {
    release_source_id: $release_source_id,
    calc_method: $calc_method,
    type: $type,
    start_date: $start_date,
    end_date: $end_date,
    calc_pollutants: {data: $calc_pollutants}
}) {
    id
  	release_source_id
    calc_pollutants {
      pollutant {
        code
        label
      }
    }
  }
}
`

export default ADD_AIR_CALC
