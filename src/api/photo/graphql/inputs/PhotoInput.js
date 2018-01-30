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

export const PhotoInput = `
    input PhotoInput {
        id: String!
        postName: String!
        whatToDo: String!
        unixTime: Int!
        bounty: Float
        image: ImageInput!
        meta: PhotoMetaInput!
    }
`;
