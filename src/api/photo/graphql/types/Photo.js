import Bounty from './Bounty';
import Image from './Image';
import PhotoMeta from './PhotoMeta';

export const Photo = `
    type Photo {
        id: Int!
        postName: String!
        whatToDo: String!
        category: Int
        bounty: Float
        image: Image!
        meta: PhotoMeta!
    }
`;
