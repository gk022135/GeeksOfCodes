import { useState } from "react"
import white_flower from '../assets/white-flowers.jpg'

import { FcDislike, FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";


import { FaCalendarCheck, FaComment, FaRegComment } from "react-icons/fa";


function Posts_Cards(props) {
    const [comment, setComment] = useState({
        comment: ""
    });

    const postDetails = {
        useremail: "Gk022135@gmail.com",
        postHeader: "i just try to implement the community posts feature for making class disussion available 24x7, anyone from university can communicate and delivery the usefull content",
        postImage: white_flower,
        tags: "",
        coments: "20",
        likes: "512",
        dislikes: "123",
    }

    function ChangeeHndler(event) {
        const { name, value } = event.target;
        // setComment(...prevState, [name] = event.target.value)
    }

    async function makelike() {
        //post request hai like inrement by +1

        /**
         * requirement user email-->get by local storage
         * nothing else 
         */

    }
    async function makedislikes() {
        /**
         * requirement user email-->get by local storage
         * nothing else 
         */

    }
    async function makeComments() {
        //post request
        //arr of string, add a new string
        /**
         * requirement user email-->get by local storage
         * comment body---> can be get by input field, usestate and Change Handler
         * nothing else 
         */
    }

    return (
        <div className="relative w-2/3 sm:w-3/5 bg-gradient-to-tr from-blue-950 to-green-500 p-2 rounded-2xl">
            <div className="flex p-2 border-b-2 relative">
                <h1 className="flex border-2 border-yellow-300 p-2 rounded-full text-xl font-bold bg-gray-400 mr-2">{postDetails.useremail[0].toUpperCase()}</h1>

                
                <h1 className="flex mt-2 text-white ">{postDetails.useremail}</h1>
            </div>

            <p className="flex text-amber-50 antialiased p-2">{postDetails.postHeader}</p>
            <img src={postDetails.postImage} width={"400px"} height={"300px"}
            className="flex relative w-3/4 h-[300px] m-5 ml-20 rounded-2xl"
            />

            <div className="flex flex-row text-white p-2 justify-evenly">
                <div className="flex flex-row">
                    <div className="flex flex-col bg-black/50 rounded-2xl p-2 m-2">
                        <button onClick={makelike}
                        className=""
                        >{}<FcLike size={25}/></button>
                        <p className="text-sm">{postDetails.likes}</p>
                    </div>
                    <div className="flex flex-col  bg-black/50 rounded-2xl p-2 m-2">
                        <button onClick={makedislikes}>
                            {<FcLikePlaceholder size={25}/>}</button>

                        <p className="text-sm">{postDetails.dislikes}</p>
                    </div>
                </div>
                <div className="flex flex-row rounded-2xl bg-black/50  m-2 relative">
                    <button onClick={makeComments}
                    className="m-1"
                    >{<FaRegComment size={25} />}</button>
                    <input type="text" 
                    placeholder="make comment here"
                    className="bg-gray-400 text-sm rounded w-3/4 h-3/6 mt-4 mr-2 p-1 text-black"
                    ></input>
                </div>
            </div>


        </div>
    )
}

export default Posts_Cards;