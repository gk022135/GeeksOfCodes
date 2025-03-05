import { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    
    // Handles new comment submission
    const handleCommentSubmit = (parentId = null) => {
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(), // Unique ID for the comment
            parentId, // Tracks which comment this is replying to
            content: commentText,
            likes: 0,
            replies: [],
        };

        setComments(prev => addComment(prev, newComment)); // Update state with new comment
        setCommentText(""); // Clear input
    };

    // Handles adding a new comment or reply
    const addComment = (commentsList, newComment) => {
        if (newComment.parentId === null) {
            return [...commentsList, newComment]; // Add top-level comment
        }
        
        return commentsList.map(comment => {
            if (comment.id === newComment.parentId) {
                return { ...comment, replies: [...comment.replies, newComment] }; // Add reply
            }
            return { ...comment, replies: addComment(comment.replies, newComment) }; // Recursively add
        });
    };

    // Handles like button
    const handleLike = (commentId) => {
        setComments(prev => updateLikes(prev, commentId));
    };

    // Updates like count
    const updateLikes = (commentsList, commentId) => {
        return commentsList.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, likes: comment.likes + 1 };
            }
            return { ...comment, replies: updateLikes(comment.replies, commentId) };
        });
    };

    // Recursive Component to Render Comments
    const Comment = ({ comment }) => {
        const [replyText, setReplyText] = useState("");
        const [showReplies, setShowReplies] = useState(false);

        return (
            <div className="border-l-4 border-gray-600 ml-4 pl-4 mt-2">
                <p className="text-white">{comment.content}</p>
                <div className="flex items-center space-x-2 mt-2">
                    <button onClick={() => handleLike(comment.id)} className="text-gray-300">
                        <FcLike size={20} /> {comment.likes}
                    </button>
                    <button onClick={() => setShowReplies(!showReplies)} className="text-gray-300">
                        {showReplies ? "Hide Replies" : "Reply"}
                    </button>
                </div>
                {showReplies && (
                    <div className="mt-2">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Reply..."
                            className="bg-gray-800 text-white rounded p-2 w-full"
                        />
                        <button 
                            onClick={() => {
                                handleCommentSubmit(comment.id);
                                setReplyText("");
                            }}
                            className="bg-blue-500 px-3 py-1 mt-2 text-white rounded"
                        >
                            Submit Reply
                        </button>
                    </div>
                )}
                {showReplies && comment.replies.map(reply => (
                    <Comment key={reply.id} comment={reply} />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg w-full max-w-2xl mx-auto">
            <h2 className="text-white text-xl mb-2">Comments</h2>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="bg-gray-800 text-white rounded p-2 w-full"
            />
            <button 
                onClick={() => handleCommentSubmit(null)}
                className="bg-green-500 px-3 py-1 mt-2 text-white rounded"
            >
                Submit
            </button>

            <div className="mt-4">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
