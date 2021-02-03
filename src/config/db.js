require('dotenv').config();
import bluebird from 'bluebird';
import mongoose from 'mongoose';

export function db() {
    mongoose.Promise = global.Promise;
    mongoose.Promise = bluebird;
    mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.error(err);
        });
}