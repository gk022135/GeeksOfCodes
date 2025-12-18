const PostModel = require("../../Models/PostsSchema");

async function SearchPosts(req, res) {
    try {
        let { q, limit = 10, cursor } = req.query;
        limit = parseInt(limit);

        console.log("Search Query:", q);

        // If empty search → behave like empty feed
        if (!q || q.trim() === "") {
            return res.status(200).json({
                success: true,
                posts: [],
                nextCursor: null
            });
        }

        const regex = new RegExp(q, "i");

        let query = {
            $or: [
                { title: regex },
                { postBody: regex },
                { email: regex }
            ]
        };

        // Cursor support (optional but future-proof)
        if (cursor) {
            const cursorDate = new Date(cursor);
            if (!isNaN(cursorDate.getTime())) {
                query.createdAt = { $lt: cursorDate };
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cursor format"
                });
            }
        }

        const posts = await PostModel.find(query)
            .sort({ createdAt: 1 }) // same as FetchAllPosts
            .limit(limit);

        const nextCursor =
            posts.length > 0
                ? posts[posts.length - 1].createdAt.toISOString()
                : null;

        return res.status(200).json({
            success: true,
            posts: posts || [],
            nextCursor
        });

    } catch (error) {
        console.error("SearchPosts Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = SearchPosts;
