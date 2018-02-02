import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server'
import _ from 'lodash';

//Queries
import { Photo } from './types/Photo';
import { Image } from './types/Image';
import { PhotoMeta } from './types/PhotoMeta';

//Inputs
import { PhotoInput, PhotoMetaInput, ImageInput } from './inputs/PhotoInput';

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
        upsertPhoto(photoInput: PhotoInput): Photo
    }
`;

export const PhotoSchema = makeExecutableSchema({
    typeDefs: [
        //Queries
        PhotoQuery, 
        PhotoMutations, 
        Photo, 
        Image, 
        PhotoMeta, 
        //Inputs
        PhotoInput, 
        PhotoMetaInput, 
        ImageInput
    ],
    resolvers: _.merge(Resolvers, {Upload: GraphQLUpload})
});