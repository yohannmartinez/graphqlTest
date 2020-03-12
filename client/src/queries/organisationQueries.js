import {gql} from 'apollo-boost'

const getOrganisations = gql`
  {
    organisations {
      id
      name
      population
    }
  }
`;

const createOrganisation = gql`
    mutation($name:String!, $population:Int!){
        addOrganisation(name:$name, population:$population){
            id
            name
            population
        }
    }
`

const deleteOrganisation = gql`
    mutation($id:ID!){
        deleteOrganisation(id:$id){
            id
            name
        }
    }
`

export {getOrganisations,createOrganisation,deleteOrganisation};