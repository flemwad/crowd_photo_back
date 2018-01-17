import mongoose from 'mongoose';
import photoSchema from './schema';

//Cannot use this binding with arrow functions, so do it old ES5 way
photoSchema.statics.upvoteById = function(photoId, cb) {

    this.model('Photo').findOne({ id: photoId }, (err, photo) => {
        if (err) console.error(err);

        photo.meta.votes++;
        photo.save((savedPhoto) => {
            console.log('photo', photo);
            cb(photo);
        });
    });
};

export default mongoose.model('Photo', photoSchema);
