import { useSelector, useDispatch } from "react-redux"


function CommunityForum() {


    return (
        <div className="flex flex-col bg-gradient-to-bl from-teal-400 to-orange-500 p-2 border-2 rounded-2xl relative m-1">
            <h1>Community Forum</h1>
            <div className="flex flex-row"> 
                <h1 className="text-sm">Posts: 67</h1>
                <h1 className="text-sm ml-[100px]">Like: 100</h1>
            </div>
            
            <a href="/todo-home" className="w-3/5 border-2 m-2 p-1 rounded-2xl bg-gradient-to-tr from-pink-700 to-green-700">Make Your Disscusion</a>



        </div>
    )
}

export default CommunityForum;