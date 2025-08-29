// src/components/ReviewSection.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../Firebase/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import StarRating from "../Common Components/StarRating";

const ReviewSection = ({ productId }) => {
  const user = useSelector((state) => state.auth.user); // from your auth slice
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for this product
  useEffect(() => {
    if (!productId) return;

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [productId]);

  // Handle new review
  // Handle new review
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) {
    alert("You must be logged in to leave a review.");
    return;
  }
  if (!rating || !comment.trim()) return;

  try {
    // prevent duplicate review by same user
    const dupQ = query(
      collection(db, "reviews"),
      where("productId", "==", productId),
      where("userId", "==", user.uid)
    );
    const dupSnap = await getDocs(dupQ);
    if (!dupSnap.empty) {
      alert("You have already submitted a review for this product.");
      return;
    }

    // add review
    await addDoc(collection(db, "reviews"), {
      productId,
      userId: user.uid,
      userName: user.displayName || user.email,
      rating, // field is "rating" in reviews
      comment,
      createdAt: serverTimestamp(),
    });

    // recompute average from all reviews
    const reviewsQ = query(
      collection(db, "reviews"),
      where("productId", "==", productId)
    );
    const reviewsSnap = await getDocs(reviewsQ);

    let total = 0;
    let count = 0;
    reviewsSnap.forEach((d) => {
      const r = Number(d.data().rating); // ensure number
      if (!Number.isNaN(r)) {
        total += r;
        count += 1;
      }
    });

    const avg = count ? total / count : 0;

    // update Product doc's "rate" field (not "rating")
    const productRef = doc(db, "Products", productId); // note capital P
    await updateDoc(productRef, {
      rate: Number(avg.toFixed(1)),
    });

    setRating(0);
    setComment("");
  } catch (err) {
    console.error("Error submitting review:", err);
  }
};


  return (
    <div className="mt-10 bg-[#282928] p-6 border-t border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-white">Customer Reviews</h2>

      {/* Review Form (only if logged in) */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-2">
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
            rows="3"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="mb-4 p-4 border border-white rounded-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg text-white">
                {review.userName}
              </h3>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-300 mt-2">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No reviews yet. Be the first!</p>
      )}
    </div>
  );
};

export default ReviewSection;
