const graphql = require("graphql");
//models
const User = require("../models/user");


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList,
  } = graphql;

const OrganisationType = new GraphQLObjectType({
  name: "Organisation",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    population: { type: GraphQLInt },
    partners: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ organisationId: parent.id });
      }
    }
  })
});

module.exports = OrganisationType;

//types needed, there are at the bottom to prevent cyclic dependency between the different types
const UserType = require("./user");
