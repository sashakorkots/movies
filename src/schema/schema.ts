import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import { DirectorQueryFields, DirectorMutationFields } from './director.js'
import { MovieQueryFields, MovieMutationFields } from './movie.js'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...DirectorMutationFields,
    ...MovieMutationFields,
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...DirectorQueryFields,
    ...MovieQueryFields
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});