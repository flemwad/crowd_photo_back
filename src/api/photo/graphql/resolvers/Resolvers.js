import { find } from 'lodash';
import mongoose from 'mongoose';

import PhotoModel from '../../db/model';

export default {
    Query: {
        photos: () => {
            return PhotoModel.find({}, '-_id').then((photos) => {
                return photos;
            })
            .catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: photos', err);
            });
        },
        photo: (obj, args, context) => {
            return PhotoModel.findOne({id: args.id}, '-_id').then((photo) => {;
                return photo;
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