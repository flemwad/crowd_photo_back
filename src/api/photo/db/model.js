import mongoose from 'mongoose';
import photoSchema from './schema';

//Cannot use "this.model" binding with arrow functions
photoSchema.statics.upvoteById = function (photoId) {
    console.log('before findOne');
    return this.model('Photo').findOne({ id: photoId }).then((photo) => {
        console.log('photo before vote', photo);
        photo.meta.votes++;

        return photo.save().then((savedPhoto) => {
            console.log('photo after save:', savedPhoto);
            // console.log(savedPhoto);
            return savedPhoto;
        })
        .catch((err) =>{
            console.error(err);
        });

    });
};

export default mongoose.model('Photo', photoSchema);
