import { useContext, useEffect, useState } from "react";
import white_flower from "../assets/white-flowers.jpg";
import { FaRegComment } from "react-icons/fa";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { AppContext } from "../ContextApi/FisrtContext";
import { toast } from "react-toastify";

function Posts_Cards({ posts }) {
    const [comment, setComment] = useState("");
    const [btncomment, setBtnComment] = useState("");
    const {PutRequets} = useContext(AppContext);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);

    const userInfo = localStorage.getItem("UserData");
    const userEmail = userInfo ? JSON.parse(userInfo).email : "";

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
        //make-like-on-post
        setLiked(true);
        console.log("is post ki id ye hai beti chod",posts._id)
        console.log("user email:-",userEmail)
        const body = {
            PostId : posts._id,
            email : userEmail
        }
        const resposne = await PutRequets("", body, "make-like-on-post");
        if(!resposne.success){
            setLiked(false);
            alert("failed to like post")
        }
        if(resposne.success){
            alert("post liked successfully")
        }
    }

    async function makedislikes() {
        setDisLiked(true);
        console.log("is post ki id ye hai beti chod",posts._id)
        console.log("user email:-",userEmail)
        const body = {
            PostId : posts._id,
            email : userEmail
        }
        const resposne = await PutRequets("", body, "make-dislike-on-post");
        if(!resposne.success){
            setDisLiked(false);
            alert("failed to Dislike post")
        }
        if(resposne.success){
            alert("post Disliked successfully")
        }
    }

    async function makeComments(props) {
        setBtnComment(props);
        localStorage.setItem("commentBtn", JSON.stringify({ commetnBtn: props }));
        setComment("");
    }

    return (
       <div className="max-w-lg w-full mx-auto bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white shadow-2xl rounded-2xl overflow-hidden mb-6 transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.02] border border-gray-700/50 backdrop-blur-sm">
            {/* Header Section */}
            <div className="flex items-center gap-4 p-5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                <div className="relative">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg ring-2 ring-blue-500/30">
                        {posts.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-100">{posts.email || "Unknown User"}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                </div>
            </div>

            {/* Post Content */}
            <div className="p-5 space-y-4">
                <a href={`/posts/detail/${posts._id}`} className="block group">
                    <h2 className="text-gray-100 mb-3 text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                        {posts.title}
                    </h2>
                </a>
               
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {posts.postBody}
                </p>
                
                {posts.postImg && (
                    <div className="relative overflow-hidden rounded-xl group">
                        <img
                            src={posts.postImg}
                            alt="Post"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                )}
            </div>

            {/* Actions Section */}
            <div className="flex justify-between items-center px-5 pb-5 pt-2 border-t border-gray-700/30">
                {/* Like & Dislike Buttons */}
                <div className="flex gap-6">
                    <button 
                        onClick={makelike} 
                        className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 group"
                    >
                        <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-green-500/20 transition-colors duration-300">
                            <BiSolidUpvote size={18} color={liked ? "#22c55e" : ""}/>
                        </div>
                        <span className="text-sm font-medium">{posts.postLikes?.length || 0}</span>
                    </button>

                    <button 
                        onClick={makedislikes} 
                        className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-300 hover:scale-105 group"
                    >
                        <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-red-500/20 transition-colors duration-300">
                            <BiSolidDownvote size={18} color={disliked ? "#ef4444" : ""}/>
                        </div>
                        <span className="text-sm font-medium">{posts.postDisLikes?.length || 0}</span>
                    </button>
                </div>

                {/* Comment Button */}
                <button
                    onClick={() => makeComments("comment")}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
                >
                    <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-blue-500/20 transition-colors duration-300">
                        <FaRegComment size={16} />
                    </div>
                    <span className="text-sm font-medium">Comment</span>
                </button>
            </div>
        </div>
    );
}

export default Posts_Cards;
