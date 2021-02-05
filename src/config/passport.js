import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from '../models/user.model';
import constants from './constants';

const jwtAdminOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use('admin',
    new JWTStrategy(jwtAdminOpts, async (payload, done) => {
        try {
            const user = await UserModel.findOne({ _id: payload.user_id, roles: { $nin: ['superadmin', 'admin'] } });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    })
)

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use('driver',
    new JWTStrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await UserModel.findOne({ _id: payload.user_id, roles: 'driver' });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    })
)

passport.use('marketing',
    new JWTStrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await UserModel.findOne({ _id: payload.user_id, roles: 'marketing' });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    })
)

export const adminJwt = passport.authenticate('admin', { session: false });
export const driverJwt = passport.authenticate('driver', { session: false });
export const marketingJwt = passport.authenticate('marketing', { session: false });