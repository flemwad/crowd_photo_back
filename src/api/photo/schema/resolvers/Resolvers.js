import { find } from 'lodash';

const egPhotos = [
    { 
        id: 1, 
        image: {
            base64: 'abb321b3s',
            size: 21521,
            extension: '.jpg'
        }, 
        name: 'foo.jpg', 
        whatToDo: 'Raise the bar', 
        votes: 0, 
        rating: 5, 
        category: 1, 
        bounty: 0.0 
    },
    { 
        id: 2, 
        image: {
            base64: 'abb321b3t',
            size: 21522,
            extension: '.png'
        }, 
        name: 'bar.png', 
        whatToDo: 'Drop the foo', 
        votes: 0, 
        rating: 3, 
        category: 2, 
        bounty: 1000.0 
    }
];

//TODO: Wire up to mongodb w/ mongoose
export default {
    Query: {
        photos: () => egPhotos
    },
    Mutation: {
        upvotePhoto: (_, { photoId }) => {
            const photo = find(egPhotos, { id: photoId });

            if (!photo) {
                throw new Error(`Couldn't find photo with id ${photoId}`);
            }

            photo.votes += 1;
            return photo;
        }
    }
};