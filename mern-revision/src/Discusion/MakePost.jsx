import { useState } from "react";
import ImageUpload from "./ImageUploadComp";

function MakePost() {
    const [data, setData] = useState({
        tags: "",
        heading: "",
        body: ""
    });

    function onChangeHandler(event) {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="relative w-3/4 p-4 bg-gray-900 text-white rounded-lg">
            <div className="flex flex-col gap-4">
                {/* Tags Input */}
                <label className="flex flex-col">
                    Tags:
                    <input
                        type="text"
                        placeholder="#topics"
                        name="tags"
                        value={data.tags}
                        onChange={onChangeHandler}
                        className="p-2  rounded"
                    />
                </label>

                {/* Heading Input */}
                <label className="flex flex-col">
                    Heading:
                    <input
                        type="text"
                        placeholder="Heading"
                        name="heading"
                        value={data.heading}
                        onChange={onChangeHandler}
                        className="p-2 rounded"
                    />
                </label>

                {/* Body Input */}
                <label className="flex flex-col">
                    Post Details:
                    <input
                        type="text"
                        placeholder="Post Details"
                        name="body"
                        value={data.body}
                        onChange={onChangeHandler}
                        className="p-2  rounded"
                    />
                </label>

                {/* Image Upload Section (Placeholder) */}
                <div className="p-2 bg-gray-800 rounded text-center">
                    
                    <ImageUpload />
                </div>
            </div>
        </div>
    );
}

export default MakePost;


/**
 * what is logi behind the making the post 
 * requirement 
 * 1. user email ---> resolve by localstorage 
 * 2. post text data ----> resolve by input fields
 * 3. if any image ---> how can be resolve this
 *       1. upload image to cloudinary get image url
 *       2. then make object which contains text data and image url 
 *   but how can we get image url at the same time of making posts
 */

/**
 * making schema 
 *   1. schema one which contains all post with user id 
 *   2. in user schema add a userPosts array which contains post _id in this array of user only
 * 
 *   for like
 *  make a likeCount Array in posts which contains user id who has been like to the paritcular post
 *   similar for dislike
 *   
 * comment 
 * make array of object which contains
 *  const arrayOfcomment = {
 * _id : userid
 *   comment : postId
 *   commentBody : " comment text here"
 * }
 *  
 */