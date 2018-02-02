import { find } from 'lodash';
import mongoose from 'mongoose';
import fs from 'fs';

import PhotoModel from 'api/photo/db/model';
import getDataFromUploadPromise from 'utils/getDataFromUploadPromise';

export default {
    Query: {
        photos: () => {
            return PhotoModel.find({}, '-_id').then((photos) => {
                return photos;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: photos', err);
            });
        },
        photo: (obj, args, context) => {
            return PhotoModel.findOne({ id: args.id }, '-_id').then((photo) => {
                return photo;
            });
        }
    },
    Mutation: {
        hypePhoto: (_, { id }) => {
            return PhotoModel.hypePhoto(id, (photo) => photo)
                //TODO: DB log or use something like Raven sentry.io
                .catch((err) => console.error('error with Mutation: hypePhoto', err));
        },
        upsertPhoto: (_, { photoInput }) => {
            return getDataFromUploadPromise(photoInput.upload)
                .then(({ bufferArray, base64, size, name, mimetype }) => {

                    //photoInput.upload is the image's filestream, 
                    //which is provided as a means to get base64 data
                    //we don't need it to insert to the db with
                    delete photoInput.upload;

                    // console.log(image);
                    //console.log('bufferArray', bufferArray);

                    return { base64, size, name, mimetype };

                }).then((image) => {

                    photoInput.image = image;

                    console.log('before upsert', photoInput);

                    //TODO: Insert a middleware function that calls to S3 for storing this image, 
                    //instead of writing it to the db as a giant string (large formats won't work anyway)
                    return PhotoModel.upsertPhoto(photoInput, (photo) => photo);

                }).catch((err) => {
                    //TODO: DB log or use something like Raven sentry.io
                    console.error('error with Mutation: upsertPhoto', err);
                });

        }
    }
};