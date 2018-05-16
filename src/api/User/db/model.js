import mongoose from 'mongoose';
import userSchema from './schema';
import _ from 'lodash';

//TODO: can I hoist this and share it with GraphQL stuff somehow?
const modelName = 'User';
const collectionName = 'users';

//TODO: Abstract this! I'm currently writing one per db entity and this part never changes
//Cannot use "this.model" binding with arrow functions
//... but we can use it inside
userSchema.statics.upsertUser = function (user) {
    //new: true will return the updated document instead of the old one, ... why isn't that by default?
    return this.model(modelName)
        .findOneAndUpdate({ id: user.id }, user, { upsert: true, new: true })
        .then((newUser) => {
            //TODO: How can I stop this from being a thing lol? Mongo pls
            delete newUser._id;
            return newUser;
        })
        .catch((err) => {
            //TODO: DB log or use something like Raven sentry.io
            console.error('error with Mutation: upsertUser', err);
        });
};

export default mongoose.model(modelName, userSchema, collectionName);
