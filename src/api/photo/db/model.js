import mongoose from 'mongoose';
import photoSchema from './schema';
import _ from 'lodash';

//Cannot use "this.model" binding with arrow functions
photoSchema.statics.hypePhoto = function (id) {
    return this.model('Photo').findOne({ id: id }).then((photo) => {
        photo.meta.hype++;

        return photo.save().then((savedPhoto) => {
            return savedPhoto;
        }).catch((err) => {
            console.error(err);
        });

    });
};

photoSchema.statics.upsertPhoto = function (photoInput) {
    return this.model('Photo')
        .findOneAndUpdate({ id: photoInput.id }, photoInput, { upsert: true, new: true })
        .then((photo) => {
            console.log('retphoto', photo)
            return photo;
        })
        .catch((err) => {
            //TODO: DB log or use something like Raven sentry.io
            console.error('error with Mutation: upsertPhoto', err);
        });
};


//TODO: Make a dev only seed script
//TODO: Also add S3 or some type of web storage for photos
// mongoose.model('Photo', photoSchema).create({
//     id: "2",
//     postName: "hax_post",
//     whatToDo: "make it perty",
//     bounty: 25.00,
//     unixTime: 1516764038,
//     image: {
//         base64: "",
//         size: 1234,
//         name: "cool",
//         extension: ".png"
//     },
//     meta: {
//         hype: 0,
//         userRating: 2,
//         editorRating: 3,
//         category: "test"
//     }
// });

export default mongoose.model('Photo', photoSchema);
