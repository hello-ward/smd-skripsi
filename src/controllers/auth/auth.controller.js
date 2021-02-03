import UserModel from '../../models/user.model';
import constants from '../../config/constants';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {

    userLogin: async (req, res, next) => {
        try {
            const user = await UserModel.findOne({ username: req.body.username }).select("-__v");
            if (user == null) {
                return res.json({
                    success: false,
                    message: "Pengguna belum terdaftar"
                });
            }
            const checkPassword = await bcrypt.compareSync(req.body.password, user.password);
            if (checkPassword) {
                // sign token
                let token = jwt.sign({ user_id: user._id }, constants.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
                if (req.body.fcm) {
                    await user.update({ fcm: req.body.fcm })
                }
                return res.json({
                    success: true,
                    message: "login successfully",
                    data: {
                        access_token: token,
                        level: user.level,
                        fcm: req.body.fcm
                    }
                });
            }
            return res.json({
                success: false,
                message: "Username / password salah"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}