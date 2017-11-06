import { makeExecutableSchema } from 'graphql-tools';

import { Photo } from './types/Photo';
import { Image } from './types/Image';
import Resolvers from './resolvers/Resolvers';

//TODO: Strongly type the input on Photo Mutations
// import { PhotoInput } from './inputs/PhotoInput';

//TODO: Wire up to mongodb w/ mongoose
// export const Resolvers = ;

const PhotoQuery = `
    type Query {
        photos: [Photo]
    }
`;

const PhotoMutation = `
    type Mutation {
        upvotePhoto (photoId: Int!): Photo
    }
`;

export const PhotoSchema = makeExecutableSchema({ 
    typeDefs: [PhotoQuery, PhotoMutation, Photo, Image],
    resolvers: Resolvers
});