import mongoose from 'mongoose';
import moment from 'moment';
import shortid from 'shortid';
import { get } from 'lodash';
import fs from 'fs';

import PhotoPostModel from 'api/PhotoPost/db/model';
import s3UploadFileStream from 'utils/aws/s3/uploadFileStream';

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
        //TODO: Make this user-contextual and store what photos they have hyped
        //Maybe use MongoDB's DBRef or brute force it? idk
        hypePhotoPost: (_, { id }) => {
            return PhotoPostModel.hypePhotoPost(id, (photoPost) => photoPost)
                //TODO: DB log or use something like Raven sentry.io
                .catch((err) => console.error('error with Mutation: hypePhotoPost', err));
        },
        upsertPhotoPost: (_, { photoPost }) => {
            if (!photoPost.upload && !photoPost.id) {
                //TODO: respond with 500, and log this error
                console.error('invalid photoPost object', photoPost)
                throw new Error('invalid photoPost object');
            }

            //Updating data, but no file supplied for the og upload
            if (!photoPost.upload && photoPost.id) {
                return PhotoPostModel.upsertPhotoPost(photoPost, (newPhotoPost) => newPhotoPost);
            }

            //A new photoPost, because it has an upload file attached, and no id
            //TODO: Make this a service method will need for later
            //First resolve the Upload promise we get from apollo-upload-client
            return photoPost.upload.then((file) => {
                //Now we have a filestream and the file info
                const { stream, filename, mimetype } = file;
                const length = get(stream, '_readableState.length', 0);

                //photoInput.upload is the image's filestream, 
                //which is provided as a means to get base64 data
                //we don't need it to insert to the db with
                delete photoPost.upload;

                //TODO: Check to see if file already exists in AWS before doing this,
                //or
                //TODO: perhaps split this up, and only allow images to be uploaded on create

                //Upload the filestream to s3, returns the s3Uri path
                return s3UploadFileStream(stream, filename, mimetype, 'PhotoPost')
                    .then((s3Uri) => {
                        return { filename, s3Uri, length, mimetype };
                    }).catch((err) => {
                        throw err;
                    });

            }).then((image) => {
                photoPost.image = image;
                photoPost.id = shortid.generate();
                photoPost.createdUTS = moment().unix();

                return PhotoPostModel.upsertPhotoPost(photoPost, (newPhotoPost) => newPhotoPost);
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error(err);
            });

        }
    }
};
