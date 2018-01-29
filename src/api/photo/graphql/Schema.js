import { makeExecutableSchema } from 'graphql-tools';

import { Photo } from './types/Photo';
import { Image } from './types/Image';
import { PhotoMeta } from './types/PhotoMeta';
import Resolvers from './resolvers/Resolvers';

const PhotoQuery = `
    type Query {
        photos: [Photo]
        photo(id: String!): Photo
    }
`;

const PhotoMutations = `
    type Mutation {
        hypePhoto(id: Int!): Photo
    }
`;

export const PhotoSchema = makeExecutableSchema({
    typeDefs: [PhotoQuery, PhotoMutations, Photo, Image, PhotoMeta],
    resolvers: Resolvers
});