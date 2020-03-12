const graphql = require("graphql");
//models
const Organisation = require("../models/organisation");

//types

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    sexe: { type: GraphQLString },
    phone: { type: GraphQLString },
    profileImageUrl: { type: GraphQLString },
    organisationId: { type: GraphQLString },
    organisation: {
      type: OrganisationType,
      resolve(parent, args) {
        console.log(parent);
        return Organisation.findById(parent.organisationId);
      }
    }
  })
});

module.exports = UserType;

//types needed, there are at the bottom to prevent cyclic dependency between the different types
const OrganisationType = require("./organisation");
