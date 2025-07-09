import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../ContextApi/FisrtContext";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { AllGetReq, loading } = useContext(AppContext);

    const userInfo = localStorage.getItem("UserData");
    const userEmail = userInfo ? JSON.parse(userInfo).email : "";

    const queryparams = {
        email: userEmail,
        _id: id,
    };

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await AllGetReq("get-post-details", queryparams);
                setPost(data?.post || null);

                console.log("data is 12345", data)
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostDetail();
    }, [id]);

    useEffect(() => {
        const container = document.getElementById("post-body");
        if (!container) return;

        // === Image Styles ===
        container.querySelectorAll("img").forEach((img) => {
            img.style.borderRadius = "1.5rem";
            img.style.maxWidth = "100%";
            img.style.marginTop = "4rem";
            img.style.marginBottom = "4rem";
            img.style.cursor = "zoom-in";
            img.style.transition = "all 0.3s ease";
            img.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
            img.style.border = "1px solid rgba(255, 255, 255, 0.1)";

            img.onmouseover = () => {
                img.style.transform = "translateY(-2px)";
                img.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
            };

            img.onmouseleave = () => {
                if (!img.style.transform.includes("scale(2)")) {
                    img.style.transform = "translateY(0)";
                    img.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
                }
            };

            img.onclick = () => {
                const isZoomed = img.style.transform.includes("scale(2)");
                img.style.transform = isZoomed ? "translateY(0)" : "scale(2)";
                img.style.cursor = isZoomed ? "zoom-in" : "zoom-out";
                img.style.zIndex = isZoomed ? "1" : "50";
                img.style.position = "relative";
            };
        });

        // === Paragraphs ===
        container.querySelectorAll("p").forEach((p) => {
            p.style.marginBottom = "1.25rem";
            p.style.lineHeight = "1.8";
            p.style.fontSize = "1.1rem";
            p.style.color = "#e2e8f0";
            p.style.textAlign = "justify";
            p.style.letterSpacing = "0.025em";
        });

        // === Headings ===
        const headingStyles = [
            { selector: "h1", size: "2.5rem", gradient: "#667eea, #764ba2" },
            { selector: "h2", size: "2rem", gradient: "#f093fb, #f5576c" },
            { selector: "h3", size: "1.5rem", gradient: "#4facfe, #00f2fe" },
        ];
        headingStyles.forEach(({ selector, size, gradient }) => {
            container.querySelectorAll(selector).forEach((h) => {
                h.style.fontSize = size;
                h.style.fontWeight = "700";
                h.style.marginTop = "2rem";
                h.style.marginBottom = "1rem";
                h.style.background = `linear-gradient(135deg, ${gradient})`;
                h.style.backgroundClip = "text";
                h.style.WebkitBackgroundClip = "text";
                h.style.color = "transparent";
                h.style.lineHeight = "1.2";
                h.style.letterSpacing = "-0.025em";
            });
        });

        // === Code ===
        container.querySelectorAll("code").forEach((code) => {
            code.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            code.style.padding = "0.25rem 0.5rem";
            code.style.borderRadius = "0.375rem";
            code.style.fontSize = "0.95rem";
            code.style.fontFamily = "JetBrains Mono, Consolas, monospace";
            code.style.color = "#fbbf24";
            code.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        });

        // === Pre ===
        container.querySelectorAll("pre").forEach((pre) => {
            pre.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
            pre.style.padding = "1.5rem";
            pre.style.borderRadius = "0.75rem";
            pre.style.overflow = "auto";
            pre.style.marginTop = "1.5rem";
            pre.style.marginBottom = "1.5rem";
            pre.style.border = "1px solid rgba(255, 255, 255, 0.1)";
            pre.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
        });

        // === Lists ===
        // Style ordered and unordered lists
        container.querySelectorAll("ul").forEach((ul) => {
            ul.style.marginBottom = "1.25rem";
            ul.style.paddingLeft = "1.5rem";
            ul.style.color = "#e2e8f0";
            ul.style.listStyleType = "disc"; // or "circle", "square"
        });

        container.querySelectorAll("ol").forEach((ol) => {
            ol.style.marginBottom = "1.25rem";
            ol.style.paddingLeft = "1.5rem";
            ol.style.color = "#e2e8f0";
            ol.style.listStyleType = "decimal"; // ensures numbers show
        });

        container.querySelectorAll("li").forEach((li) => {
            li.style.marginBottom = "0.5rem";
            li.style.lineHeight = "1.7";
        });


        // === Blockquotes ===
        container.querySelectorAll("blockquote").forEach((quote) => {
            quote.style.borderLeft = "4px solid #667eea";
            quote.style.paddingLeft = "1.5rem";
            quote.style.margin = "1.5rem 0";
            quote.style.fontStyle = "italic";
            quote.style.color = "#cbd5e1";
            quote.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
            quote.style.padding = "1rem 1.5rem";
            quote.style.borderRadius = "0.5rem";
        });

        // === Links ===
        container.querySelectorAll("a").forEach((link) => {
            link.style.color = "#60a5fa";
            link.style.textDecoration = "none";
            link.style.borderBottom = "1px solid transparent";
            link.style.transition = "all 0.3s ease";

            link.onmouseover = () => {
                link.style.color = "#93c5fd";
                link.style.borderBottom = "1px solid #60a5fa";
            };

            link.onmouseleave = () => {
                link.style.color = "#60a5fa";
                link.style.borderBottom = "1px solid transparent";
            };
        });

    }, [post?.postBody]);

    if (loading || !post) {
        return (
            <div className="text-center py-10 text-white text-lg animate-pulse">
                Loading post details...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                    <div className="relative">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg ring-2 ring-blue-500/30">
                            {post.email?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-100">{post.email || "Unknown User"}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    </div>
                </div>


                {/* html ko render kiya ja rha hai */}
                <div
                    id="post-body"
                    className="prose prose-lg max-w-none p-10 pt-0"
                    style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        color: "#e2e8f0",
                        lineHeight: "1.8",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.postBody }}
                />
            </div>
        </div>
    );
};

export default PostDetail;
