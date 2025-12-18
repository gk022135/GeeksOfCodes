import { useContext, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { AppContext } from "../ContextApi/FisrtContext";

function Posts_Cards({ posts }) {
    const { PutRequets } = useContext(AppContext);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);

    const userInfo = localStorage.getItem("UserData");
    const userEmail = userInfo ? JSON.parse(userInfo).email : "";

    async function makelike() {
        setLiked(true);
        const body = { PostId: posts._id, email: userEmail };
        const response = await PutRequets("", body, "make-like-on-post");
        if (!response.success) setLiked(false);
    }

    async function makedislikes() {
        setDisLiked(true);
        const body = { PostId: posts._id, email: userEmail };
        const response = await PutRequets("", body, "make-dislike-on-post");
        if (!response.success) setDisLiked(false);
    }

    return (
        <article className="max-w-3xl mx-auto border-b border-base-300 py-8 px-4 bg-base-100 hover:bg-base-200 transition-colors duration-200">

            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-semibold">
                    {posts.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                    <p className="text-sm font-medium text-base-content">
                        {posts.email}
                    </p>
                    <p className="text-xs text-base-content/60">
                        {new Date(posts.createdAt).toDateString()}
                    </p>
                </div>
            </div>

            {/* Content */}
            <a href={`/posts/detail/${posts._id}`} className="block">
                <h2 className="text-xl font-semibold text-base-content leading-snug mb-2 hover:text-primary transition-colors">
                    {posts.title || "Untitled"}
                </h2>

                <div
                    className="text-base-content/80 text-base leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: posts.postBody }}
                />
            </a>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 text-sm text-base-content/60">

                <button
                    onClick={makelike}
                    className={`flex items-center gap-1.5 hover:text-success transition-colors ${
                        liked ? "text-success" : ""
                    }`}
                >
                    <BiSolidUpvote size={18} />
                    <span>{posts.postLikes?.length || 0}</span>
                </button>

                <button
                    onClick={makedislikes}
                    className={`flex items-center gap-1.5 hover:text-error transition-colors ${
                        disliked ? "text-error" : ""
                    }`}
                >
                    <BiSolidDownvote size={18} />
                    <span>{posts.postDisLikes?.length || 0}</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-info transition-colors">
                    <FaRegComment size={16} />
                    <span>{posts.postComments?.length || 0}</span>
                </button>
            </div>
        </article>
    );
}

export default Posts_Cards;