import { find } from 'lodash';
import mongoose from 'mongoose';

import PhotoModel from '../../db/model';

export default {
    Query: {
        photos: () => {
            return PhotoModel.find((err, photos) => {
                if (err) console.error(err);

                return photos;
            })
        }
    },
    Mutation: {
        upvotePhoto: (_, { photoId }) => {
            //TODO: This is working but isn't promisified, so GraphQL returns updatePhoto: null result
            PhotoModel.upvoteById(photoId, (photo) => {
                console.log('retphoto', photo)

                //Hmmm, how to get rid of this?
                delete photo._id;

                return photo;
            });
        }
    }
};