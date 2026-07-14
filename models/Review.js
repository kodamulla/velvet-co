import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: "/default.jpg" // Userge image ekak nattan default eka wadinawa
        },
        comment: {
            type: String,
            required: true
        },
        starCount: {
            type: Number,
            required: true,
            min: 1, 
            max: 5  
        },
        isBlocked: {
            type: Boolean,
            default: false 
        },
        productID: {
            type: String,
            required: true 
        }
    },
    { 
        timestamps: true 
    }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;