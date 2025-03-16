import { useEffect, useState } from "react";
import white_flower from "../assets/white-flowers.jpg";
import { FcDislike, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

import CommentsSection from "./CommentSection";
import img2 from '../assets/headphones.jpg'

function Posts_Cards(props) {
    const [comment, setComment] = useState("");
    const [btncomment, setBtnComment] = useState("");


    useEffect(() => {
        const commentBtn = localStorage.getItem("commentBtn");
        if (commentBtn) {
            setBtnComment(JSON.parse(commentBtn).commetnBtn);
        }
    }, []);

    const postDetails = {
        useremail: "Gk022135@gmail.com",
        postHeader: "I just tried to implement the community posts feature for making class discussions available 24x7. Anyone from the university can communicate and deliver useful content.",
        postImage: img2,
        tags: "",
        comments: "20",
        likes: "512",
        dislikes: "123",
    };

    function handleChange(event) {
        setComment(event.target.value);
    }

    async function makelike() {
        // Handle like functionality (POST request)
    }

    async function makedislikes() {
        // Handle dislike functionality (POST request)
    }

    async function makeComments(props) {
        setBtnComment(props)

        localStorage.setItem("commentBtn", JSON.stringify({ commetnBtn: props }))
        console.log("Comment submitted:", comment);
        setComment("");
    }

    return (
        <div className="relative w-auto sm:w-3/7 text-white bg-white/10 p-2 rounded-2xl">
            {/* Header Section */}
            <div>
                <div className="flex p-2 border-b-2 border-white/30">
                    <h1 className="border-1 border-yellow-300 p-2 rounded-full text-xl font-bold bg-black mr-2">
                        {postDetails.useremail[0].toUpperCase()}
                    </h1>
                    <h1 className="mt-2 text-white/50 text-sm">{postDetails.useremail}</h1>
                </div>

                {/* Post Content */}
                <p className="text-amber-50 p-2 text-sm">{postDetails.postHeader}</p>
                <img
                    src={postDetails.postImage}
                    alt="Post"
                    width={"200px"}
                    height={"200px"}
                    className="p-1 w-3/4 sm:h-2/5 m-5 rounded-2xl"
                />

                {/* Actions Section */}
                <div className="flex flex-row text-white p-2 justify-evenly">
                    <div className="flex flex-row">
                        {/* Like Button */}
                        <div className="flex flex-col bg-black/50 rounded-2xl p-2 m-2 hover:bg-green-800">
                            <button onClick={makelike}>
                                <BiSolidUpvote size={25} />
                            </button>
                            <p className="text-sm">{postDetails.likes}</p>
                        </div>

                        {/* Dislike Button */}
                        <div className="flex flex-col bg-black/50 rounded-2xl p-2 m-2 hover:bg-red-600">
                            <button onClick={makedislikes}>
                                <BiSolidDownvote size={25} />
                            </button>
                            <p className="text-sm">{postDetails.dislikes}</p>
                        </div>
                    </div>

                    {/* Comment Input Section */}
                    <div className="flex flex-row rounded-2xl bg-black/50 m-2 p-2 hover:bg-white/40">
                        <button onClick={() => (makeComments("comment"))} className="m-1">
                            <FaRegComment size={25} />
                        </button>
                        {/* <textarea
                        value={comment}
                        onChange={handleChange}
                        placeholder="Write a comment..."
                        className="bg-gray-400 text-sm rounded w-3/4 p-1 text-black"
                    /> */}
                    </div>
                </div>
            </div>
            {
                btncomment === "comment" ? ("") : ("")
            }
        </div>
    );
}

export default Posts_Cards;



//just a card which will show all post 