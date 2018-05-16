import mongoose from 'mongoose';
import moment from 'moment';
import shortid from 'shortid';

import UserModel from 'api/User/db/model';

export default {
    Query: {
        users: () => {
            //TODO: pagination, filtering, etc...
            return UserModel.find({}, '-_id').then((users) => {
                return users;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: users', err);
            });
        },
        user: (obj, args, context) => {
            return UserModel.findOne({ id: args.id }, '-_id').then((user) => {
                return user;
            }).catch((err) => {
                //TODO: DB log or use something like Raven sentry.io
                console.error('error with Query: user', err);
            });
        }
    },
    Mutation: {
        upsertUser: (_, { user }) => {
            //TODO: Password encryptyion and then JWT auth token hashing n' stuff
            if (!user.id) {
                user.id = shortid.generate();
                user.createdUTS = moment().unix();
            }

            return UserModel.upsertUser(user, (newUser) => newUser);
        }
    }
};
