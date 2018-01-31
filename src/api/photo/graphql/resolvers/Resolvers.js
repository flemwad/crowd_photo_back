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
        hypePhoto: (_, { id }) => {
            return PhotoModel.hypePhoto(id, (photo) => {

                delete photo._id;

                return photo;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Mutation: hypePhoto', err);
            });
        },
        upsertPhoto: (_, { photoInput }) => {
            
            //TODO: Change this to accept a Blob file instead of a string for image
            //base64 strings that are too big respond with 400 to the client
            //I'll need some kind of middleware with the fileAPI to process it after the fact as well
            //May also need to use: https://github.com/jaydenseric/apollo-upload-server

            return PhotoModel.upsertPhoto(photoInput, (photo) => {

                delete photo._id;

                console.log('retphoto', photo)
                return photo;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Mutation: upsertPhoto', err);
            });
            
        },
        uploadImage: (_, { file }) => {
            console.log(file);
        }
    }
};