import UserModel from '../../../models/user.model';

export default {
    start: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.user._id, roles: 'driver' });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Driver tidak ditemukan'
                });
            }
            if (user.gps) {
                return res.status(400).json({
                    success: false,
                    message: 'Gps already started'
                });
            }
            await user.update({
                gps: true,
                location: {
                    lat: req.body.lat,
                    long: req.body.long
                }
            });
            return res.status(200).json({
                success: true,
                message: `Start gps successfully`,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    stop: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.user._id, roles: 'driver' });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Driver tidak ditemukan'
                });
            }
            await user.update({
                gps: false
            });
            return res.status(200).json({
                success: true,
                message: `Stop gps successfully`,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    updateLocation: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.user._id, roles: 'driver' });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Driver tidak ditemukan'
                });
            }
            await user.update({
                location: {
                    lat: req.body.lat,
                    long: req.body.long
                }
            });
            return res.status(200).json({
                success: true,
                message: 'Update location successfully',
                last_location: {
                    lat: req.body.lat,
                    long: req.body.long
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    }
}