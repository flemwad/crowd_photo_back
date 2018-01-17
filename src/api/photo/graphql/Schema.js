import { makeExecutableSchema } from 'graphql-tools';

import { Photo } from './types/Photo';
import { Image } from './types/Image';
import { PhotoMeta } from './types/PhotoMeta';
import Resolvers from './resolvers/Resolvers';

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
    typeDefs: [PhotoQuery, PhotoMutation, Photo, Image, PhotoMeta],
    resolvers: Resolvers
});