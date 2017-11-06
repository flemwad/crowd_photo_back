import { mergeSchemas } from 'graphql-tools';

import { PhotoSchema } from './src/api/photo/schema/Schema';

//Merge together each individual Schema to make the app schema
export const schema = mergeSchemas({
    schemas: [PhotoSchema]
});