import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../ContextApi/FisrtContext";
import Posts_Cards from "./Posts_Cards";
// import {Loader} from "../Loader"

const PostDetail = () => {
    const { id } = useParams();
    console.log("idddd", id)
    const [post, setPost] = useState(null);
    const { AllGetReq, loading } = useContext(AppContext);

    const userInfo = localStorage.getItem("UserData");
    const userEmail = userInfo ? JSON.parse(userInfo).email : "";

    const queryparams = {
        email: userEmail,
        _id: id
    }

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await AllGetReq("get-post-details", queryparams);

                console.log("data", data)
                setPost(data.post);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
        fetchPostDetail();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            {loading ? ("Loding....") : (
                <Posts_Cards posts={post} />
            )}
        </div>
    )

};

export default PostDetail;
