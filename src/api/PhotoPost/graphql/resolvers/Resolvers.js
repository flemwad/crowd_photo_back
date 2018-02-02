import { find } from 'lodash';
import mongoose from 'mongoose';
import fs from 'fs';

import PhotoPostModel from 'api/PhotoPost/db/model';
import getDataFromUploadPromise from 'utils/getDataFromUploadPromise';

export default {
    Query: {
        photoPosts: () => {
            //TODO: pagination, filtering, etc...
            return PhotoPostModel.find({}, '-_id').then((photoPosts) => {
                return photoPosts;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: photoPosts', err);
            });
        },
        photoPost: (obj, args, context) => {
            return PhotoPostModel.findOne({ id: args.id }, '-_id').then((photoPost) => {
                return photoPost;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: photoPost', err);
            });
        }
    },
    Mutation: {
        hypePhotoPost: (_, { id }) => {
            return PhotoPostModel.hypePhotoPost(id, (photoPost) => photoPost)
                //TODO: DB log or use something like Raven sentry.io
                .catch((err) => console.error('error with Mutation: hypePhotoPost', err));
        },
        upsertPhotoPost: (_, { photoPost }) => {
            return getDataFromUploadPromise(photoPost.upload)
                .then(({ bufferArray, base64, size, name, mimetype }) => {

                    //photoInput.upload is the image's filestream, 
                    //which is provided as a means to get base64 data
                    //we don't need it to insert to the db with
                    delete photoPost.upload;

                    // console.log(image);
                    //console.log('bufferArray', bufferArray);

                    return { base64, size, name, mimetype };

                }).then((image) => {

                    photoPost.image = image;

                    console.log('before upsert', photoPost);

                    //TODO: Insert a middleware function that calls to S3 for storing this image, 
                    //instead of writing it to the db as a giant string (large formats won't work anyway)
                    return PhotoPostModel.upsertPhotoPost(photoPost, (newPhotoPost) => newPhotoPost);

                }).catch((err) => {
                    //TODO: DB log or use something like Raven sentry.io
                    console.error('error with Mutation: upsertPhotoPost', err);
                });

        }
    }
};