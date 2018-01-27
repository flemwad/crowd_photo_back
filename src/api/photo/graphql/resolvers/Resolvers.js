import { find } from 'lodash';
import mongoose from 'mongoose';

import PhotoModel from '../../db/model';

export default {
    Query: {
        photos: () => {
            return PhotoModel.find({}, '-_id').then((photos) => {
                console.log('photos', photos);
                return photos;
            })
            .catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: photos', err);
            });
        }
    },
    Mutation: {
        hypePhoto: (_, { photoId }) => {
            return PhotoModel.hypePhoto(photoId, (photo) => {

                delete photo._id;

                return photo;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Mutation: hypePhoto', err);
            });
        }
    }
};