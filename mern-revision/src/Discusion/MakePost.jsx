import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUploadComp";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const { SendDataSignLogin, loading } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        console.log("Post Submitted", { title, body });

        const UploadedImageDetails = localStorage.getItem("ImageData");
        const ImageUrl = UploadedImageDetails ? JSON.parse(UploadedImageDetails).secure_url : "";

        const UserInfo = localStorage.getItem("UserData");
        const UserEmail = UserInfo ? JSON.parse(UserInfo).email : "";

        const objectToSend = {
            email: UserEmail,
            url: ImageUrl,
            title: title,
            body: body,
        };

        console.log(ImageUrl);
        const response = await SendDataSignLogin("make-a-post", objectToSend);

        if (!response) {
            toast.error("Error in posting");
            return;
        }



        if (response.success) {
            toast.success("Yay! Your post is done");
            setTimeout(() => {
                navigate("/post-all");
            }, 2000);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white/10 p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-2 mt-1 border ${!title.trim() ? "border-red-500" : "border-gray-600"
                            } bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter title"
                    />
                    {!title.trim() && (
                        <p className="text-red-500 text-sm mt-1">Please fill out this field.</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-600 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Enter post content"
                    ></textarea>
                </div>

                <ImageUpload />

                <div className="flex gap-2">
                    <button type="button" className="bg-gray-700 px-4 py-2 rounded text-gray-400 cursor-not-allowed">
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded ${title.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
                            } text-white`}
                        disabled={!title.trim()}
                    >
                        Post
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
