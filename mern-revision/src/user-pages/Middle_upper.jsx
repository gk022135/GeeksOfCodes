import { NavLink } from 'react-router-dom';
import Qr_image from '../../public/Qr Scan.png'

function Middle_upper({ props, color }) {
    console.log("color you get new", color)


    return (
        <div
            className="middle-upper-1 relative bg-black border-amber-300 border-2 justify-center items-center p-1 overflow-hidden ml-1 mr-1 w-1/3 rounded-2xl h-3/4 content-center hover:bg-emerald-400 bg-gradient-to-r from-green-800 from-red-400"
            // style={{ background: `${color}` }}
        >
            <NavLink to={'/qrscanner'}>
            <p className="absolute rounded-2xl p-2 bg-black/50 z-20 text-white  text-xl font-semibold top-4 left-1/2 transform -translate-x-1/2">
                Make QR Scan Here </p> 
                </NavLink>
            {/* <img src="Qr Scan.png" className="z-10  w-full h-full object-cover" /> */}
        </div>

    )
}

export default Middle_upper;