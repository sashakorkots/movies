import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import Director from '../models/director.js'
import Movie from '../models/movie.js'
import { DirectorType } from './director.js'

const MovieType :GraphQLObjectType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId)
      }
    }
  }),
});

const QueryFields = {
  movie: {
    type: MovieType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: any) {
      return Movie.findById(args.id)
    }
  },
  movies: {
    type: new GraphQLList(MovieType),
    args: { },
    resolve(parent: any, args: any) {
      return Movie.find({});
    }
  },
}

const MutationFields = {
  addMovie: {
    type: MovieType,
    args: {
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      directorId: { type: GraphQLID },
    },
    resolve(parent: any, args: any) {
      const director = new Movie({
        name: args.name,
        genre: args.genre,
        directorId: args.directorId,
      });
      return director.save();
    }
  }
};

export {
  MovieType,
  QueryFields as MovieQueryFields,
  MutationFields as MovieMutationFields,
}