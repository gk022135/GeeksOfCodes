import { useState } from "react";
import { FaFilePdf, FaYoutube } from "react-icons/fa";

function AddResources() {
  const [videoLink, setVideoLink] = useState("");
  const [resources, setResources] = useState([]);

  function handleAddResource() {
    if (videoLink.trim() !== "") {
      setResources([...resources, { type: "video", url: videoLink }]);
      setVideoLink("");
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setResources([...resources, { type: "file", name: file.name, url: fileUrl }]);
    }
  }

  // Function to extract YouTube Video ID
  function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  return (
    <div className="flex flex-col gap-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-10">
      {/* Form */}
      <h2 className="text-2xl font-bold text-white mb-4">Add Teaching Resources</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Paste YouTube video link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={handleAddResource}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold p-3 rounded-xl transition-all"
        >
          Add Video
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-black font-semibold p-3 rounded-xl transition-all">
          Upload PDF/PPT
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Display Added Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {resources.map((res, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-white hover:scale-105 transition-all"
          >
            {res.type === "video" ? (
              <>
                <FaYoutube size={40} className="text-red-500 mb-2" />
                {extractYouTubeId(res.url) ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(res.url)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl mt-2"
                  ></iframe>
                ) : (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline text-center break-words"
                  >
                    Watch Video
                  </a>
                )}
              </>
            ) : (
              <>
                <FaFilePdf size={40} className="text-red-400 mb-2" />
                <a
                  href={res.url}
                  download={res.name}
                  className="text-cyan-300 underline text-center break-words"
                >
                  {res.name}
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddResources;
