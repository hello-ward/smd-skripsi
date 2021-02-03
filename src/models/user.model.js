import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;
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
    level: {
        type: String,
        default: 'employee'
    },
    fcm: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, { collection: 'user' });

// hash user password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

export default mongoose.model("user", UserSchema, 'user');