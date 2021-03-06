import mongoose from 'mongoose';

import Admins from './seeders/admin.seeder';

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/gps-tracker';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Admins
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
