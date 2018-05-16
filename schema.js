import { mergeSchemas } from 'graphql-tools';

import { PhotoPostSchema } from './src/api/PhotoPost/graphql/Schema';
import { UserSchema } from './src/api/User/graphql/Schema';

//Merge together each individual Schema to make the app schema
export const schema = mergeSchemas({
    schemas: [PhotoPostSchema, UserSchema]
});