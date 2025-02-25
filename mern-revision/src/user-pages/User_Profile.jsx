


function UserProfile({ props }) {


    return (
        <div className="relative flex border-2 rounded-2xl p-2">
            <div className="flex w-[80px] bg-amber-400 rounded-full justify-center content-center p-2">
                <img src={encodeURI(props.picture)} alt="Profile" className="flex rounded-full"></img>
            </div>
            <div  className=" flex flex-col mt-4 ml-4 text-white bg-red">
                <p1>{props.name}</p1>
                <p1>{props.email}</p1> 
            </div>
        </div>
    )
}
export default UserProfile;