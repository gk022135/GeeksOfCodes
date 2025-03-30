//get-all-post
// get all post :- on scroll of page (infinite scroll)

/**
 * we have following methods for fetching data of all posts
 * 1. FetchAll post :- using useEffect and manual maintaining scroll (currently using in this file)
 * 2. debouncing :- explore about it on youtube and internet
 * 3. intersction Observer :- explore about it on youtube and internet
 * 4. use React Query :- explore about it on youtube and internet
 * 5. use Redux toolkit query :-explore about it on youtube and internet
 */

import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import Posts_Cards from "./Posts_Cards";

const FetchAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState("");
    const [hasMore, setHasMore] = useState(true);

    const {AllGetReq} = useContext(AppContext)

    const fetchPosts = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        const queryparams = {
            limit: 10,
            cursor: cursor
        };

        try {
            const data = await AllGetReq("all-posts", queryparams);
            // const data = await res.json();
            console.log("all posts data", data);

            setPosts((prev) => [...prev, ...data.posts]);
            setCursor((prevCursor) => data.nextCursor || prevCursor);
            setHasMore(Boolean(data.nextCursor));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    }, [cursor, hasMore, loading, AllGetReq]);

    useEffect(() => {
        fetchPosts();
    }, [cursor]);

    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (
                    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                    !loading
                ) {
                    fetchPosts();
                }
            }, 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, fetchPosts]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <Posts_Cards  posts = {post}/>
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default FetchAllPost;
