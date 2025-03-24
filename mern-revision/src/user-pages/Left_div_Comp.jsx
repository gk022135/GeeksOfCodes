
function LeftDivComp({ props }) {


    return (
        <div
            className="middle-upper-1 flex flex-row relative bg-black/50 border-gray-400 border-2 justify-between items-center p-2 overflow-hidden w-full md:w-full rounded-2xl h-auto gap-4 m-2 hover:bg-emerald-400 transition duration-300"
        >
            <div className="flex flex-col">
                <h1 className="text-xl text-white font-bold">{props.head}</h1>
                <p className="text-sm text-white/80">{props.para}</p>
            </div>

            <a
                href={props.url}
                className="border-2 rounded-2xl bg-blue-800 text-white px-3 py-1 hover:bg-red-500 transition duration-300"
            >
                {props.name}
            </a>
        </div>


    )
}

export default LeftDivComp;