import Review from "../models/Review.js";


export function addReview(req, res) {
    const data = req.body;

    const review = new Review({
        email: data.email,
        name: data.name,
        profilePicture: data.profilePicture,
        comment: data.comment,
        starCount: data.starCount,
        productID: data.productID
    });

    review.save()
        .then(() => {
            res.json({ message: "Review added successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to add review", error: error.message });
        });
}


export function getReviews(req, res) {
    Review.find()
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
        });
}


export function toggleBlockReview(req, res) {
    
    const reviewId = req.params.id; 

    Review.findById(reviewId)
        .then((review) => {
            if (review == null) {
                return res.status(404).json({ message: "Review not found" });
            }
            
            
            review.isBlocked = !review.isBlocked; 
            
            review.save()
                .then(() => {
                    res.json({ 
                        message: "Review status updated successfully", 
                        isBlocked: review.isBlocked 
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to update review status", error: error.message });
        });
}