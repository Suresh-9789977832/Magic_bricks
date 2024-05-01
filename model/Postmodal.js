import mongoose from 'mongoose';

const Postschema = new mongoose.Schema({
    address: {
        type: String,
        required:true
    },
    bathrooms: {
        type: Number,
        required:true

    },
    bedrooms: {
        type: Number,
        required:true

    },
    description: {
        type: String,
        required:true

    },
    furnished: {
        type: Boolean,
        required:true

    },
    imgurls: {
        type:Array,
        required:true

    },
    name: {
        type: String,
        required:true

    },
    parking: {
        type: Boolean,
        required:true

    },
    regularprice: {
        type: Number,
        required:true

    },
    type: {
        type: String,
        required:true
    },
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

},{timestamps:true})

const postmodal = mongoose.model('Posts', Postschema)

export default postmodal