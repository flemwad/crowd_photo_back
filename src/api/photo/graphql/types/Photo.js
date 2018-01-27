import Bounty from './Bounty';
import Image from './Image';
import PhotoMeta from './PhotoMeta';

export const Photo = `
    type Photo {
        id: String!
        postName: String!
        whatToDo: String!
        unixTime: Int!
        bounty: Float
        image: Image!
        meta: PhotoMeta!
    }
`;
