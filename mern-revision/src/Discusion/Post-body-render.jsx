// now where used till now

import { useEffect } from "react";

function PostBodyRenderer({ postBody }) {
  useEffect(() => {
    const container = document.getElementById("post-body");
    if (!container) return;

    // Style all <img> tags
    container.querySelectorAll("img").forEach((img) => {
      img.style.borderRadius = "5rem";
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
        if (img.style.transform !== "scale(2)") {
          img.style.transform = "translateY(0)";
          img.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
        }
      };

      img.onclick = () => {
        const isZoomed = img.style.transform.includes("scale(2)");
        img.style.transform = isZoomed ? "translateY(0)" : "scale(2)";
        img.style.cursor = isZoomed ? "zoom-in" : "zoom-out";
        img.style.zIndex = isZoomed ? "1" : "50";
        img.style.position = isZoomed ? "relative" : "relative";
      };
    });

    // Style all <p> tags
    container.querySelectorAll("p").forEach((p) => {
      p.style.marginBottom = "1.25rem";
      p.style.lineHeight = "1.8";
      p.style.fontSize = "1.1rem";
      p.style.color = "#e2e8f0";
      p.style.textAlign = "justify";
      p.style.letterSpacing = "0.025em";
    });

    // Style headings with gradients and enhanced typography
    container.querySelectorAll("h1").forEach((h) => {
      h.style.fontSize = "2.5rem";
      h.style.fontWeight = "800";
      h.style.marginBottom = "1.5rem";
      h.style.marginTop = "2rem";
      h.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      h.style.backgroundClip = "text";
      h.style.WebkitBackgroundClip = "text";
      h.style.color = "transparent";
      h.style.letterSpacing = "-0.025em";
      h.style.lineHeight = "1.2";
    });

    container.querySelectorAll("h2").forEach((h) => {
      h.style.fontSize = "2rem";
      h.style.fontWeight = "700";
      h.style.marginBottom = "1.25rem";
      h.style.marginTop = "1.75rem";
      h.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      h.style.backgroundClip = "text";
      h.style.WebkitBackgroundClip = "text";
      h.style.color = "transparent";
      h.style.letterSpacing = "-0.025em";
    });

    container.querySelectorAll("h3").forEach((h) => {
      h.style.fontSize = "1.5rem";
      h.style.fontWeight = "600";
      h.style.marginBottom = "1rem";
      h.style.marginTop = "1.5rem";
      h.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      h.style.backgroundClip = "text";
      h.style.WebkitBackgroundClip = "text";
      h.style.color = "transparent";
    });

    // Style code blocks
    container.querySelectorAll("code").forEach((code) => {
      code.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      code.style.padding = "0.25rem 0.5rem";
      code.style.borderRadius = "0.375rem";
      code.style.fontSize = "0.95rem";
      code.style.fontFamily = "JetBrains Mono, Consolas, monospace";
      code.style.color = "#fbbf24";
      code.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    });

    // Style pre blocks
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

    // Style lists
    container.querySelectorAll("ul, ol").forEach((list) => {
      list.style.marginBottom = "1.25rem";
      list.style.paddingLeft = "1.5rem";
      list.style.color = "#e2e8f0";
    });

    container.querySelectorAll("li").forEach((li) => {
      li.style.marginBottom = "0.5rem";
      li.style.lineHeight = "1.7";
    });

    // Style blockquotes
    container.querySelectorAll("blockquote").forEach((quote) => {
      quote.style.borderLeft = "4px solid #667eea";
      quote.style.paddingLeft = "1.5rem";
      quote.style.marginLeft = "0";
      quote.style.marginTop = "1.5rem";
      quote.style.marginBottom = "1.5rem";
      quote.style.fontStyle = "italic";
      quote.style.color = "#cbd5e1";
      quote.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
      quote.style.padding = "1rem 1.5rem";
      quote.style.borderRadius = "0.5rem";
    });
    container.querySelectorAll("pre").forEach((quote) => {
      quote.style.borderLeft = "4px solid #667eea";
      quote.style.paddingLeft = "1.5rem";
      quote.style.marginLeft = "0";
      quote.style.marginTop = "1.5rem";
      quote.style.marginBottom = "1.5rem";
      quote.style.fontStyle = "italic";
      quote.style.color = "#cbd5e1";
      quote.style.backgroundColor = "rgba(000, 126, 262, 0.1)";
      quote.style.padding = "1rem 1.5rem";
      quote.style.borderRadius = "0.5rem";
    });

    // Style links
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

  }, [postBody]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Decorative header */}
       
        
        {/* Content container */}
        
          <div
            id="post-body"
            className="prose prose-lg max-w-none"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#e2e8f0",
              lineHeight: "1.8"
            }}
            dangerouslySetInnerHTML={{ __html: postBody }}
          />
       
        {/* Decorative footer gradient */}
       
      </div>
    </div>
  );
}

export default PostBodyRenderer;



//no where it is used till now