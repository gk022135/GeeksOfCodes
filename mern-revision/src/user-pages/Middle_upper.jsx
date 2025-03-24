import { NavLink } from 'react-router-dom';
import Qr_image from '../../public/Qr Scan.png'

function Middle_upper({ props, color }) {
    console.log("color you get new", color)


    return (
        <div
            className="flex flex-col md:flex-col relative text-white font-semibold bg-black/70 border-gray-400 border-2 justify-between p-5 overflow-hidden w-full md:w-1/3 rounded-2xl h-auto gap-"
        >
            <div className="flex flex-col text-center p-1 w-1/3 h-1/1">
                <h1 className="text-xl text-white font-bold">{props.head}</h1>
                <p className="text-sm text-white/80">{props.para}</p>
            </div>

            <a
                href={props.url}
                className="border-2 rounded-2xl bg-blue-700 text-white font-bold px-4 py-2 hover:bg-blue-800 transition duration-300"
            >
                {props.name}
            </a>
        </div>


    )
}

export default Middle_upper;