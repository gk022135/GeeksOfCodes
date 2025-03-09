
function LeftDivComp({props}) {


    return (
        <div
            className="middle-upper-1 flex flex-row relative bg-black border-amber-300 border-2 justify-center items-center p-1 overflow-hidden ml-1 mr-1 md:w-3/3 rounded-2xl h-auto gap-2 m-2 content-center hover:bg-emerald-400 bg-gradient-to-r  from-green-400 to-blue-900 "
        // style={{ background: `${color}` }}
        >
            <div className='flex flex-col'>
                <h1 className='text-xl text-black font-bold mt-2'>{props.head}</h1>
                <p className='text-sm text-black/80'>{props.para}</p>

            </div>
            <a href={props.url}
                className='border-2 rounded-2xl bg-red-400 text-black p-1'
            >{props.name}</a>
        </div>

    )
}

export default LeftDivComp;