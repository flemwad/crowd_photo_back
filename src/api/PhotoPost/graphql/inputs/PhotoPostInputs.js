export const PhotoPostMetaInput = `
    input PhotoPostMetaInput {
        hype: Int!
        userRating: Int
        editorRating: Int
        category: String!
    }
`

//Note that scalar Upload is a drop-in from: https://github.com/jaydenseric/apollo-upload-server
export const PhotoPostInput = `
    scalar Upload

    input PhotoPostInput {
        id: String
        postName: String!
        whatToDo: String!
        unixTime: Int
        bounty: Float
        upload: Upload
        meta: PhotoPostMetaInput!
    }
`;
