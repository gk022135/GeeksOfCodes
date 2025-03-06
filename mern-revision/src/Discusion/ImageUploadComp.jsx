// image uplaod component :- image will be upload to cloudinary

import { useState } from "react";
import { RiImageFill } from "react-icons/ri";

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isClicked, setClicked] = useState(false);
    const [uploading, setUploading] = useState(false);

    function ClickHandler() {
        setClicked(!isClicked);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log(selectedFile)
        setPreview(URL.createObjectUwRL(file));
    };

    // Upload to Cloudinary
    const uploadToCloudinary = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.secure_url) {
                console.log("Uploaded Image URL:", data.secure_url);
                sendImageUrlToBackend(data.secure_url);
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    const sendImageUrlToBackend = async (imageUrl) => {
        try {
            const response = await fetch("hello/v1/gkkk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageUrl })
            });

            const data = await response.json();
            console.log("Backend Response:", data);
            alert("Image URL sent to backend!");
        } catch (error) {
            console.error("Error sending image URL to backend:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-md">
            <button onClick={ClickHandler} className="mb-4">
                <RiImageFill size={50} color={isClicked ? "white" : "black"} />
            </button>

            {/* File Input */}
            <input type="file" accept="image/*" onChange={handleFileChange} className="block text-sm" />

            {/* Image Preview */}
            {preview && (
                <div className="mt-2">
                    <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />
                </div>
            )}

            {/* Upload Button */}
            <button 
                onClick={uploadToCloudinary} 
                disabled={uploading}
                className="mt-4 px-4 py-2 bg-blue-500 rounded text-white"
            >
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
}

export default ImageUpload;
