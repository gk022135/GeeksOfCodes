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

import { useState, useEffect, useContext } from "react";
import AppContext from '../ContextApi/FisrtContext'

const FetchAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const {AllGetReq} = useContext(AppContext)

    const fetchPosts = async () => {
        if (!hasMore) return;
        setLoading(true);
        try {
            const res = await AllGetReq(`/api/posts?limit=10&cursor=${cursor || ""}`, null);
            const data = await res.json();

            setPosts((prev) => [...prev, ...data.posts]);
            setCursor(data.nextCursor);
            setHasMore(!!data.nextCursor);  //!! mean it boolean
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loading
            ) {
                fetchPosts();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <img src={post.imageUrl} alt={post.caption} width="300px" />
                    <p>{post.caption}</p>
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default FetchAllPost;
