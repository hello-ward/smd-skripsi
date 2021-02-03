export default {

    userLogin: async (req, res, next) => {
        try {
            return res.json({
                success: true,
                message: 'Successfully logged in'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}