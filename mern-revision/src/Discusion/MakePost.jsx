import { useState } from "react";
import ImageUpload from "./ImageUploadComp";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    console.log("Post Submitted", { title, body });
  };
  const userInfo = localStorage.getItem("UserData");
  const userEmail = userInfo ? JSON.parse(userInfo).email : "";




  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 mt-1 border ${
              !title.trim() ? "border-red-500" : "border-gray-600"
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
          <button type="button" className="bg-gray-700 px-4 py-2 rounded text-gray-400 cursor-not-allowed">Save Draft</button>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              title.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
            } text-white`}
            disabled={!title.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
