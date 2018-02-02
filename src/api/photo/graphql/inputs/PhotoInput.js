export const ImageInput = `
    input ImageInput {
        base64: String!
        size: Int!
        name: String!
        extension: String!
    }
`

export const PhotoMetaInput = `
    input PhotoMetaInput {
        hype: Int
        userRating: Int
        editorRating: Int
        category: String
    }
`

//Note that scalar Upload is a drop-in from: https://github.com/jaydenseric/apollo-upload-server
export const PhotoInput = `
    scalar Upload

    input PhotoInput {
        id: String!
        postName: String!
        whatToDo: String!
        unixTime: Int!
        bounty: Float
        upload: Upload!
        meta: PhotoMetaInput!
    }
`;
