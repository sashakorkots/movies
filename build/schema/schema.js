import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import Director from '../src/models/director.js';
import Movie from '../src/models/movie.js';
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Director.findById(parent.directorId);
            }
        }
    }),
});
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({ directorId: parent.id });
            }
        }
    }),
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
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
            resolve(parent, args) {
                return Director.findByIdAndDelete(args.id);
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const director = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId,
                });
                return director.save();
            }
        }
    }
});
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Movie.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Director.findById(director => director.id == args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {},
            resolve(parent, args) {
                return Movie.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: {},
            resolve(parent, args) {
                return Director.find({});
            }
        }
    }
});
export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
//# sourceMappingURL=schema.js.map