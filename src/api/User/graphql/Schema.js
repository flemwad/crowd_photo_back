import { makeExecutableSchema } from 'graphql-tools';
import _ from 'lodash';

//Queries
import { User } from './types/User';

//InputTypes
import { UserInput } from './inputs/UserInputs';

import Resolvers from './resolvers/Resolvers';

const UserQuery = `
    type Query {
        users: [User]
        user(id: String!): User
    }
`;

const UserMutations = `
    type Mutation {
        upsertUser(user: UserInput): User
    }
`;

export const UserSchema = makeExecutableSchema({
    typeDefs: [
        //Queries
        UserQuery, 

        //Types
        User,

        //Mutations
        UserMutations, 

        //Input Types
        UserInput
    ],
    resolvers: Resolvers
});