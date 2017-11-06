import Bounty from './Bounty';
import Image from './Image';

export const Photo = `
    type Photo {
        id: Int!
        image: Image!
        name: String!
        whatToDo: String!
        votes: Int
        rating: Int
        category: Int
        bounty: Float
    }
`;