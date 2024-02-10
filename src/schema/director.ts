import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import Director from '../models/director.js'
import Movie from '../models/movie.js'
import { MovieType } from './movie.js'

const DirectorType :GraphQLObjectType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id })
      }
    }
  }),
});

const MutationFields = {
  addDirector: {
    type: DirectorType,
    args: {
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
    },
    resolve(parent: any, args: any) {
      const director = new Director({
        name: args.name,
        age: args.age,
      });
      return director.save();
    }
  },
  removeDirector: {
    type: DirectorType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent: any, args: any) {
      return Director.findByIdAndDelete(args.id);
    }
  },
};

const QueryFields = {
  director: {
    type: DirectorType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: any) {
      return Director.findById(args.id)
    }
  },
  directors: {
    type: new GraphQLList(DirectorType),
    args: { },
    resolve(parent: any, args: any) {
      return Director.find({});
    }
  }
};

export {
  DirectorType,
  QueryFields as DirectorQueryFields,
  MutationFields as DirectorMutationFields
}