
function RightDivComp({props}) {


    return (
        <div className="left-first flex flex-col bg-black rounded-2xl h-1/4 mt-2 mb-2 border-2 w-12/13 text-amber-200">
            <p>Hello, {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Role: {props.role}</p>
        </div>
    )
}
export default RightDivComp;