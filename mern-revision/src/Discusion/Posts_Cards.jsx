import { useEffect, useState } from "react";
import white_flower from "../assets/white-flowers.jpg";
import { FaRegComment } from "react-icons/fa";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

function Posts_Cards({ posts }) {
    const [comment, setComment] = useState("");
    const [btncomment, setBtnComment] = useState("");

    useEffect(() => {
        const commentBtn = localStorage.getItem("commentBtn");
        if (commentBtn) {
            setBtnComment(JSON.parse(commentBtn).commetnBtn);
        }
    }, []);

    function handleChange(event) {
        setComment(event.target.value);
    }

    async function makelike() {
        // Handle like functionality
    }

    async function makedislikes() {
        // Handle dislike functionality
    }

    async function makeComments(props) {
        setBtnComment(props);
        localStorage.setItem("commentBtn", JSON.stringify({ commetnBtn: props }));
        setComment("");
    }

    return (
        <div className="max-w-lg w-full mx-auto bg-gray-900 text-white shadow-lg rounded-xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl">
            {/* Header Section */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                    {posts.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                    <h3 className="text-sm font-semibold">{posts.email || "Unknown User"}</h3>
                    <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
                <p className="text-gray-300 text-sm mb-3">{posts.title}</p>
                <img
                    src={posts.postImg || white_flower}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            {/* Actions Section */}
            <div className="flex justify-between items-center px-4 pb-4">
                {/* Like & Dislike Buttons */}
                <div className="flex gap-5">
                    <button onClick={makelike} className="flex items-center gap-1 text-gray-300 hover:text-green-500 transition">
                        <BiSolidUpvote size={22} />
                        <span className="text-sm">{posts.postLikes?.length || 0}</span>
                    </button>

                    <button onClick={makedislikes} className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition">
                        <BiSolidDownvote size={22} />
                        <span className="text-sm">{posts.postDislies?.length || 0}</span>
                    </button>
                </div>

                {/* Comment Button */}
                <button
                    onClick={() => makeComments("comment")}
                    className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition"
                >
                    <FaRegComment size={22} />
                    <span className="text-sm">Comment</span>
                </button>
            </div>
        </div>
    );
}

export default Posts_Cards;
