import mongoose from 'mongoose';
import photoSchema from './schema';

//Cannot use "this.model" binding with arrow functions
photoSchema.statics.upvoteById = function (photoId) {
    return this.model('Photo').findOne({ id: photoId }).then((photo) => {
        photo.meta.votes++;

        return photo.save().then((savedPhoto) => {
            return savedPhoto;
        })
        .catch((err) =>{
            console.error(err);
        });

    });
};

export default mongoose.model('Photo', photoSchema);
