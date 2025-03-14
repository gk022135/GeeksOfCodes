import { useEffect, useState } from "react";
import Posts_Cards from "./Posts_Cards";
import CommentsSection from "./CommentSection";
import UserProfile from "../user-pages/User_Profile";
import CommunityNavbar from "./CommunityNavbar";


function HomeDiscussion (){
    const [isparams, setParams] = useState(null);

    useEffect ( ()=>{
        const storedData = localStorage.getItem("buttonClickType");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setParams(parsedData.BtnName);
        }
    },[])


    function clickHandler (params) {
        setParams(params);
        localStorage.setItem("buttonClickType", JSON.stringify({BtnName : isparams}))
        console.log("params ",isparams)
    }


    return (
        <div className="relative flex flex-col h-auto">
           <div >
              <CommunityNavbar />
           </div>
           <div className="relative flex flex-row" >

               <div className="hidden bg-black w-0 sm:w-1/4 h-screen p-2 text-white  rounded-2xl border-1 sm:flex sm:flex-col">
               {/* <UserProfile /> */}

               <button onClick={ () => clickHandler("all-posts")}
                className="border-2 border-emerald-400 rounded-2xl p-2 m-2 "
                >All POsts</button>


               <button onClick={ () => clickHandler("last-hours")}
                className="border-2 border-emerald-400 rounded-2xl p-2 m-2 "
                >last hOurs</button>


               <button onClick={ () => clickHandler("Your-all-posts")}
                className="border-2 border-emerald-400 rounded-2xl p-2 m-2 "
                >Your Posts</button>

               
               <button onClick={ () => clickHandler("make-posts")}
                className="border-2 border-emerald-400 rounded-2xl p-2 m-2 "
                >Make A posts</button>
               
               </div>

               <div className="bg-black w-full sm:w-3/4 relative h-screen p-2 border rounded-2xl"
               > 
               <h1>kya render ho rha hai ji {isparams}</h1>
                  
                  {isparams === "all-posts" ? ( <Posts_Cards />) : ("")}
                  {/* {isparams === "comment" ? (<CommentsSection />) : ("null")} */}
               </div>
           </div>
        </div>
    )
}
export default HomeDiscussion;