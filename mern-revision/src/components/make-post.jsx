import { useState, useContext } from "react";
import RichTextEditor from "./text-editor";
import ImageUpload from "../Discusion/ImageUploadComp";
import { PenTool, Image, FileText, Sparkles, Plus } from "lucide-react";
import ObjectDisplayCopy from "./clipboard";
import { AppContext } from "../ContextApi/FisrtContext";
import { toast } from "react-toastify";

export default function MakePosts() {
  const [data, setData] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const { SendDataSignLogin } = useContext(AppContext);

  function htmlback(arg) {
    setData(arg);
  }

  const UploadedImageDetails = localStorage.getItem("ImageData");
  const ImageUrl = UploadedImageDetails ? JSON.parse(UploadedImageDetails).secure_url : "";

  const UserInfo = localStorage.getItem("UserData");
  const UserEmail = UserInfo ? JSON.parse(UserInfo).email : "";

  const objectToSend = {
    email: UserEmail,
    url: ImageUrl || "",
    title: "",
    body: data,
  };

  const postHandler = async () => {
    try {
      setIsPosting(true);
      const response = await SendDataSignLogin("make-a-post", objectToSend);

      if (response?.success) {
        toast.success("Post submitted successfully!");
        // Optionally reset the editor
        setData("");
        localStorage.removeItem("ImageData");
      } else {
        toast.error("Failed to submit post.");
      }
    } catch (err) {
      toast.error("An error occurred while submitting.");
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Post
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Craft compelling content with our rich text editor and enhance your posts with beautiful images
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Editor Card */}
          <div className="bg-base-100 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">Write Your Story</h2>
              </div>
              <p className="text-blue-100 mt-2">Express your thoughts with our powerful rich text editor</p>
            </div>
           
            <div className="p-6">
              <RichTextEditor htmlback={htmlback} />
            </div>

            <div className="p-6 text-right">
              <button
                onClick={postHandler}
                disabled={isPosting}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white ${isPosting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
              >
                <Plus size={20} />
                {isPosting ? "Posting..." : "Submit Post"}
              </button>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-base-100 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
              <div className="flex items-center gap-3">
                <Image className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">Add Visual Appeal</h2>
              </div>
              <p className="text-emerald-100 mt-2">Upload an image to make your post more engaging</p>
            </div>
            <div className="p-6">
              <div className="bg-base-100 rounded-2xl p-6 border border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Ready to add some visual magic?
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Upload your image and get the URL to enhance your post with stunning visuals
                    </p>
                    <div className="rounded-xl p-4 shadow-sm">
                      <ImageUpload />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ObjectDisplayCopy ImageUrl={ImageUrl} />

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Your creativity, enhanced by powerful tools</p>
        </div>
      </div>
    </div>
  );
}
