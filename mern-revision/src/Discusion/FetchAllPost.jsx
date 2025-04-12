import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import Posts_Cards from "./Posts_Cards";

const FetchAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const { AllGetReq } = useContext(AppContext);

    const fetchPosts = useCallback(async () => {
        if (!hasMore || loading) return; // Prevent unnecessary calls
        setLoading(true);

        const queryparams = { limit: 10 };
        if (cursor) queryparams.cursor = cursor; //  Avoid sending `null` cursor

        try {
            const data = await AllGetReq("all-posts", queryparams) || {}; // Ensure data is at least an empty object
            console.log("Fetched data:", data);

            if (!data.success) {
                console.error("Failed to fetch posts:", data.message);
                return;
            }

            // Ensure posts is an array
            const newPosts = Array.isArray(data.posts) ? data.posts : [];
            setPosts((prev) => [...prev, ...newPosts]);

            if (data.nextCursor) {
                setCursor(data.nextCursor); // Update cursor if there are more posts
            } else {
                setHasMore(false); // Stop fetching if no more posts
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }

        setLoading(false);
    }, [hasMore, loading, cursor, AllGetReq]); // Added `cursor` to dependencies

    useEffect(() => {
        fetchPosts(); // Fetch posts on initial mount
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loading &&
                hasMore
            ) {
                fetchPosts();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, fetchPosts]); // Proper dependencies

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <Posts_Cards posts={post} />
                </div>
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more posts to load</p>}
        </div>
    );
};

export default FetchAllPost;