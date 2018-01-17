import mongoose from 'mongoose';

//Maybe try something like this https://github.com/graphql-compose/graphql-compose-mongoose 
//so we don't have to basically redefine the same model here and for graphql
export default new mongoose.Schema({
    id: Number,
    postName: String,
    whatToDo: String,
    category: String,
    bounty: Number,
    image: {
        base64: String,
        size: Number,
        name: String,
        extension: String
    },
    meta: {
        votes: Number,
        rating: Number
    }
});