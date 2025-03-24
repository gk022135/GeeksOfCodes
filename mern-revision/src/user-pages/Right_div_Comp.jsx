
function RightDivComp({props}) {
    console.log("ky inag ",props.picture)


    return (
        <div className="left-first flex flex-col bg-black/70 rounded-2xl mb-2 border-2 w- text-white border-gray-400">
            <div className="flex flex-col justify-center content-center p-2">
            <p>Hello, {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Role: {props.role}</p>
            <img src={encodeURI(props.picture)} alt="Profile" />

            <p>{props.nickname}</p>
            </div>
        </div>
    )
}
export default RightDivComp;