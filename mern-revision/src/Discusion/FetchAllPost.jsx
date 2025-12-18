import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import Posts_Cards from "./Posts_Cards";
import PageNotFound from "../ui/page-not-found";
import { Search } from "lucide-react";

const FetchAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const { AllGetReq } = useContext(AppContext);
    const inputRef = useRef(null);

    const isSearching = searchQuery.trim().length > 0;

    /* ---------------- FETCH ALL POSTS ---------------- */

    const fetchPosts = useCallback(async () => {
        if (!hasMore || loading || isSearching) return;

        setLoading(true);

        const queryparams = { limit: 10 };
        if (cursor) queryparams.cursor = cursor;

        try {
            const data = await AllGetReq("all-posts", queryparams) || {};
            if (!data.success) return;

            const newPosts = Array.isArray(data.posts) ? data.posts : [];
            setPosts((prev) => [...prev, ...newPosts]);

            if (data.nextCursor) setCursor(data.nextCursor);
            else setHasMore(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, cursor, isSearching, AllGetReq]);

    /* ---------------- SEARCH ---------------- */

    useEffect(() => {
        if (!isSearching) {
            setPosts([]);
            setCursor(null);
            setHasMore(true);
            fetchPosts();
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await AllGetReq("search-posts", { q: searchQuery });
                if (data?.success) {
                    setPosts(data.posts || []);
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, isSearching]);

    /* ---------------- INITIAL LOAD ---------------- */

    useEffect(() => {
        fetchPosts();
        inputRef.current?.focus();
    }, []);

    /* ---------------- INFINITE SCROLL ---------------- */

    useEffect(() => {
        if (isSearching) return;

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 120 &&
                !loading &&
                hasMore
            ) {
                fetchPosts();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, fetchPosts, isSearching]);

    /* ---------------- RENDER ---------------- */

    return (
        <section className="w-full">

            {/* Search Bar */}
            <div className="sticky top-2 z-10 bg-base-100/90 backdrop-blur border border-gray-700 rounded-xl px-4 py-3 flex items-center gap-3 max-w-3xl mx-auto">
                <Search size={20} className="text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts, email or content..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
                />
            </div>

            {/* Feed */}
            <div className="mt-6 max-w-3xl mx-auto space-y-8 px-1 sm:px-0 ">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="border-b-1 border-blue-800 rounded-2xl bg-base-100 shadow-sm transition"
                    >
                        <Posts_Cards posts={post} />
                    </div>
                ))}

                {loading && (
                    <p className="text-center text-gray-400 py-6">
                        Loading posts…
                    </p>
                )}

                {!isSearching && !hasMore && (
                    <p className="text-center text-gray-500 py-6">
                        You’ve reached the end ✨
                    </p>
                )}

                {!loading && posts.length === 0 && !isSearching && (
                    <PageNotFound />
                )}
            </div>
        </section>
    );
};

export default FetchAllPost;
