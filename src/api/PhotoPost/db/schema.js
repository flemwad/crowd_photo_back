import mongoose from 'mongoose';

//Maybe try something like this https://github.com/graphql-compose/graphql-compose-mongoose

export default new mongoose.Schema({
    id: String,
    postName: String,
    whatToDo: String,
    bounty: Number,
    //TODO:
    // bounty: {
    //     externalUuid: String,
    //     amount: Number,
    //     currencyType: String
    // }
    createdUTS: Number,
    image: {
        filename: String,
        s3Uri: String,
        length: Number,
        mimetype: String
    },
    meta: {
        hype: Number,
        userRating: Number,
        editorRating: Number,
        category: String
    }
});
