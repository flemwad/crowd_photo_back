import { find } from 'lodash';
import mongoose from 'mongoose';

import PhotoModel from '../../db/model';

export default {
    Query: {
        photos: () => {
            return PhotoModel.find({}, '-_id', (err, photos) => {
                if (err) console.error(err);

                return photos;
            }).exec();
        }
    },
    Mutation: {
        upvotePhoto: (_, { photoId }) => {
            return PhotoModel.upvoteById(photoId, (photo) => {

                delete photo._id;

                return photo;
            });
        }
    }
};