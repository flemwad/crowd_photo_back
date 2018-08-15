import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'apollo-upload-server'
import _ from 'lodash';

//Queries
import { PhotoPost } from './types/PhotoPost';

//Types
import { Image } from './types/Image';
import { PhotoPostMeta } from './types/PhotoPostMeta';

//InputTypes
import { PhotoPostInput, PhotoPostMetaInput } from './inputs/PhotoPostInputs';

import Resolvers from './resolvers/Resolvers';

const PhotoPostQuery = `
    type Query {
        photoPosts: [PhotoPost]
        photoPost(id: String!): PhotoPost
    }
`;

const PhotoPostMutations = `
    type Mutation {
        deletePhotoPost(id: String!): String
        hypePhotoPost(id: String!): PhotoPost
        upsertPhotoPost(photoPost: PhotoPostInput): PhotoPost
    }
`;

export const PhotoPostSchema = makeExecutableSchema({
    typeDefs: [
        //Queries
        PhotoPostQuery, 

        //Types
        PhotoPost,
        Image,
        PhotoPostMeta, 

        //Mutations
        PhotoPostMutations, 

        //Input Types
        PhotoPostInput, 
        PhotoPostMetaInput,
    ],
    resolvers: _.merge(Resolvers, {Upload: GraphQLUpload})
});