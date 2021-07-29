import UserModel from '../../../models/user.model';

export default {
    getEmployee: async (req, res) => {
        try {
            const data = await UserModel.find({ roles: { $nin: ['superadmin', 'admin'] } });
            return res.json({
                success: true,
                data
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    createEmployee: async (req, res) => {
        try {
            if (!req.body.roles || !req.body.username || !req.body.password || !req.body.phone) {
                return res.status(400).json({
                    success: false,
                    message: 'Mohon isian dilengkapi'
                });
            }
            const check_exists_user = await UserModel.findOne({ username: req.body.username });
            if (check_exists_user != null) {
                return res.status(200).json({
                    success: false,
                    message: 'Username sudah digunakan'
                });
            }
            const user = await UserModel.create(req.body);
            return res.status(200).json({
                success: true,
                message: 'Berhasil menambahkan pegawai'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    detailEmployee: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.params.id });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Pegawai tidak ditemukan'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    updateEmployee: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.params.id });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Pegawai tidak ditemukan'
                });
            }
            await user.update(req.body);
            return res.status(200).json({
                success: true,
                message: 'Data pegawai berhasil diperbarui'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    },

    deleteEmployee: async (req, res) => {
        try {
            const user = await UserModel.findOneAndDelete({ _id: req.params.id });
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'ID Pegawai tidak ditemukan'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Data pegawai berhasil dihapus'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan sistem'
            });
        }
    }
}