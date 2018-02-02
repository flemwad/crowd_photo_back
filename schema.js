import { mergeSchemas } from 'graphql-tools';

import { PhotoPostSchema } from './src/api/PhotoPost/graphql/Schema';

//Merge together each individual Schema to make the app schema
export const schema = mergeSchemas({
    schemas: [PhotoPostSchema]
});