import mongoose from 'mongoose';

//Maybe try something like this https://github.com/graphql-compose/graphql-compose-mongoose

export default new mongoose.Schema({
    id: String,
    first: String,
    last: String,
    password: String,
    nick: String,
    email: String,
    bio: String,
    editor: Boolean,
    //TODO:
    // meta: {
    // }
    createdUTS: Number
});
