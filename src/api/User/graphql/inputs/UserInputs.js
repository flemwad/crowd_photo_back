//Note that scalar Upload is a drop-in from: https://github.com/jaydenseric/apollo-upload-server
export const UserInput = `
    input UserInput {
        id: String
        first: String!
        last: String!
        password: String
        nick: String!
        email: String!
        bio: String
        editor: Boolean
        createdUTS: Int!
    }
`;
