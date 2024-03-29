import gql from "graphql-tag"

const COMPANIES = gql`
query Companies {
  companies_own {
    company {
      id
      company_name
      company_type {
        short_name
      }
      company_phone
      iin_bin
      company_email
      company_description
      company_legal_address {
        address
        zip
        city {
          name
          state {
            name
            country {
              name
            }
          }
        }
      }
      company_actual_address {
        address
        zip
        city {
          name
          state {
            name
            country {
              name
            }
          }
        }
      }
      bank_accounts {
        id
        iban
        bank {
          name
        }
        currency {
          short_name
        }
      }
    }
  }
}
`

export default COMPANIES
