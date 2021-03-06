import Bounty from './Bounty';
import Image from './Image';
import PhotoPostMeta from './PhotoPostMeta';

export const PhotoPost = `
    type PhotoPost {
        id: String!
        postName: String!
        whatToDo: String!
        createdUTS: Int!
        bounty: Float
        image: Image!
        meta: PhotoPostMeta!
    }
`;
