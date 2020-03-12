const graphql = require("graphql");
const _ = require("lodash");

//types
const UserType = require('../types/user');
const OrganisationType = require('../types/organisation');

//models
const User = require("../models/user");
const Organisation = require("../models/organisation");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    organisation: {
      type: OrganisationType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Organisation.findById(args.id);
      }
    },
    organisations: {
      type: new GraphQLList(OrganisationType),
      resolve(parent, args) {
        return Organisation.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganisation: {
      type: OrganisationType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        population: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let organisation = new Organisation({
          name: args.name,
          population: args.population
        });
        return organisation.save();
      }
    },
    deleteOrganisation: {
      type: OrganisationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Organisation.deleteOne({_id : args.id},()=>{
          console.log('deleted ',args.id)
        })
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        sexe: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        profileImageUrl: { type: GraphQLString },
        organisationId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          age: args.age,
          sexe: args.sexe,
          phone: args.phone,
          organisationId: args.organisationId,
          profileImageUrl: args.profileImageUrl
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
