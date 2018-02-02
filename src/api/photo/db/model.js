import mongoose from 'mongoose';
import photoSchema from './schema';
import _ from 'lodash';

//Cannot use "this.model" binding with arrow functions
photoSchema.statics.hypePhoto = function (id) {
    return this.model('Photo').findOne({ id: id }).then((photo) => {
        photo.meta.hype++;

        return photo.save().then((savedPhoto) => {
            delete photo._id;
            return savedPhoto;
        }).catch((err) => {
            console.error(err);
        });

    });
};

photoSchema.statics.upsertPhoto = function (photoInput) {
    //new:true will return the updated document instead of the old one
    return this.model('Photo')
        .findOneAndUpdate({ id: photoInput.id }, photoInput, { upsert: true, new: true })
        .then((photo) => {
            delete photo._id;
            return photo;
        })
        .catch((err) => {
            //TODO: DB log or use something like Raven sentry.io
            console.error('error with Mutation: upsertPhoto', err);
        });
};

export default mongoose.model('Photo', photoSchema);
