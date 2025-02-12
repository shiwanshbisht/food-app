import React, { useContext, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import UserContext from "../utils/UserContext";

const Review = () => {
  const { user } = useContext(UserContext);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  const [formData, setFormData] = useState({
    name: user.name,
    review: "",
    rating: 0,
  });
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, review: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendurl}/review`, formData);
      setMessage("Review submitted successfully!");
      setFormData({ review: "", rating: 0 });
      setShowForm(false);
    } catch (error) {
      console.error("There was an error submitting the review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-center">
      {showForm ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Rate us!</h1>
          <p className="mb-6 text-gray-600">
            Your input is super important in helping us understand your needs
            better, so we can customize our services to suit you perfectly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                How would you rate our app?
              </label>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((emoji) => (
                  <span
                    key={emoji}
                    onClick={() => handleRatingChange(emoji)}
                    required
                    className={`cursor-pointer text-4xl mx-2 ${
                      emoji === formData.rating ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    {emoji === 1
                      ? "😠"
                      : emoji === 2
                      ? "😞"
                      : emoji === 3
                      ? "😐"
                      : emoji === 4
                      ? "😊"
                      : "😄"}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder="Add a comment..."
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Send now
            </button>
          </form>
        </>
      ) : (
        <div class="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
          <div class="h-40 bg-rose-500 pt-10 sm:h-56">
            <img
              class="h-full w-full object-contain bg-rose-400"
              src="https://res.cloudinary.com/dqwgwb6gd/image/upload/v1723274724/unwaediln9vr2lpzkeqg.png"
              alt=""
            />
          </div>
          <div class="flex flex-col items-center bg-white px-4 py-10">
            <h2 class="mb-2 text-3xl font-bold text-rose-500 sm:text-4xl">
              Thank you!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
