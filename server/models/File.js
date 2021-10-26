import mongoose from "mongoose";

const File = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    user: {type: mongoose.ObjectId, ref: 'User'},
    parent: {type: mongoose.ObjectId, ref: 'File'},
    children: [{type: mongoose.ObjectId, ref: 'File'}]
})

export default mongoose.model('File', File)