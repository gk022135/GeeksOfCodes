import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HotTopicsPosts() {
  const { search } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("search", search)

  useEffect(() => {
    if (!search) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        //example endpoint: http://localhost:3000/api/?search=redis
        const res = await fetch.get(`http://localhost:3000/api`, {
          params: { search }, // axios auto-encodes ?search=value
        });

        setPosts(res.data); // assuming API returns array of posts
      } catch (err) {
        console.error("Error fetching hot topic posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  if (loading) return <div className="text-center p-6 text-gray-400">Loading posts for "{search}"...</div>;
  if (error) return <div className="text-center p-6 text-red-400">{error}</div>;
  if (!posts.length) return <div className="text-center p-6 text-gray-400">No posts found for "{search}".</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 top-10">
      <h1 className="text-2xl font-semibold text-white mb-4 capitalize">
        Hot Topics: {search}
      </h1>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-4 border border-gray-700 hover:bg-gray-800 transition"
          >
            <h2 className="text-xl font-semibold text-orange-400 mb-2">{post.title}</h2>
            <p className="text-gray-300 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
