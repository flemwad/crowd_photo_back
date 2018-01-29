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
    unixTime: Number,
    image: {
        base64: String,
        size: Number,
        name: String,
        extension: String
    },
    meta: {
        hype: Number,
        userRating: Number,
        editorRating: Number,
        category: String
    }
});
