import UserModel from '../../../models/user.model';

export default {
    getProfile: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.user._id }).select("-__v");
            if (user == null) {
                return res.json({
                    success: false,
                    message: 'Pengguna tidak ditemukan'
                });
            }
            return res.json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}