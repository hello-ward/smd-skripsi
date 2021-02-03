import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { UserModel, AdminModel } from '../models';
import constants from './constants';

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use('user',
    new JWTStrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await UserModel.findOne({ _id: payload.userId });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    })
)

const jwtAdminOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use('admin',
    new JWTStrategy(jwtAdminOpts, async (payload, done) => {
        try {
            const user = await AdminModel.findOne({ _id: payload.adminId });

            if (!user || !payload.admin) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    })
)

const jwtInterconnectionOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use('interconnection',
    new JWTStrategy(jwtInterconnectionOpts, async (payload, done) => {
        try {
            if (payload.userId == undefined && payload.adminId == undefined) {
                return done(null, {
                    success: false,
                    message: "Unauthorized"
                });
            }
            if (payload.userId) {
                const user = await UserModel.findOne({ _id: payload.userId });
                if (user.banned.status == 1) {
                    return done(null, {
                        success: false,
                        message: "Your are banned"
                    })
                }
                return done(null, {
                    success: true,
                    data: user
                });
            } else if (payload.adminId) {
                const admin = await AdminModel.findOne({ _id: payload.adminId });
                return done(null, {
                    success: true,
                    data: admin
                });
            }
            return done(null, {
                success: false,
                message: "Unauthorized"
            });
        } catch (e) {
            return done(e, false);
        }
    })
)

export const userJwt = passport.authenticate('user', { session: false });
export const adminJwt = passport.authenticate('admin', { session: false });
export const interconnectionJwt = passport.authenticate('interconnection', { session: false });