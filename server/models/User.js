import mongoose from 'mongoose';

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    diskSpace: {
        type: Number,
        default: 1024**3*10
    },
    usedSpace: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    files: [{
        type: mongoose.ObjectId,
        ref: 'File'
    }]
})

export default mongoose.model('User', User)