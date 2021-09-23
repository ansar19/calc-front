import gql from "graphql-tag"

const COMPANY_BY_PK = gql`
query companies_by_pk($id: uuid!) {
  companies_by_pk(id: $id) {
    id
    company_name
    company_type {
      id
      name
      short_name
    }
    company_phone
    iin_bin
    company_email
    company_description
    company_head {
      id
      first_name
      middle_name
      last_name
      position {
        name

      }
      phone
      email
    }
    company_legal_address {
      id
      address
      zip
      city {
        id
        name
        state {
          id
          name
          country {
            id
            name
          }
        }
      }
    }
    company_actual_address {
      id
      address
      zip
      city {
        id
        name
        state {
          id
          name
          country {
            id
            name
          }
        }
      }
    }
    bank_accounts {
      id
      iban
      bank {
        id
        name
      }
      currency {
        id
        short_name
      }
    }
  }
}
`

export default COMPANY_BY_PK
