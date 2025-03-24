import { useSelector, useDispatch } from "react-redux"


function CommunityForum() {


    return (
        <div className="flex flex-col bg-black/70 p-2 border-2 border-gray-400 text-white rounded-2xl relative m-1">
            <h1>Community Forum</h1>
            <div className="flex flex-row"> 
                <h1 className="text-sm">Posts: 67</h1>
                <h1 className="text-sm ml-[100px]">Like: 100</h1>
            </div>
            
            <a href="/todo-home" className="w-3/5 border-2 m-2 p-1 rounded-2xl bg-blue-800">Make Your Disscusion</a>



        </div>
    )
}

export default CommunityForum;