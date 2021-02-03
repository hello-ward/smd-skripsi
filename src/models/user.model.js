import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    username: {
        type: String
    }, 
    password: {
        type: String
    },
    status: {
        type: Number
    },
    phone: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, { collection: 'user' });

export default mongoose.model("user", UserSchema, 'user');