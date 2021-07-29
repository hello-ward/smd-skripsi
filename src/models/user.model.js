import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
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
    address: {
        type: String
    },
    roles: {
        type: String,
        default: 'driver'
    },
    fcm: {
        type: String
    },
    gps: {
        type: Boolean,
        default: false
    },
    location: {
        lat: {
            type: String
        },
        long: {
            type: String
        }
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

UserSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model("user", UserSchema, 'user');