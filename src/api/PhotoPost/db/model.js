import mongoose from 'mongoose';
import photoPostSchema from './schema';
import _ from 'lodash';

//TODO: can I hoist this and share it with GraphQL stuff somehow?
const modelName = 'PhotoPost';
const collectionName = 'photoPost';

//Cannot use "this.model" binding with arrow functions
photoPostSchema.statics.hypePhotoPost = function (id) {
    return this.model(modelName).findOne({ id: id }).then((photoPost) => {
        photoPost.meta.hype++;

        return photoPost.save().then((savedPhotoPost) => {
            delete savedPhotoPost._id;
            return savedPhotoPost;
        }).catch((err) => {
            console.error(err);
        });

    });
};

photoPostSchema.statics.upsertPhotoPost = function (photoPost) {
    //new:true will return the updated document instead of the old one
    return this.model(modelName)
        .findOneAndUpdate({ id: photoPost.id }, photoPost, { upsert: true, new: true })
        .then((newPhotoPost) => {
            delete newPhotoPost._id;
            return newPhotoPost;
        })
        .catch((err) => {
            //TODO: DB log or use something like Raven sentry.io
            console.error('error with Mutation: upsertPhotoPost', err);
        });
};

export default mongoose.model(modelName, photoPostSchema, collectionName);
