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

//TODO: Make a dev only seed script so 
//I'm using this crap to seed if I change the schema

// db.photos.insert({
//     id: "1",
//     postName: "second_post",
//     whatToDo: "make it perty",
//     bounty: 25.00,
//     unixTime: 1516764038,
//     image: {
//         base64: "aabbc12==v",
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