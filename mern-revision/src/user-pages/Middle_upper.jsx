import { NavLink } from 'react-router-dom';

function Middle_upper({props, color}) {
    console.log("color you get new",color)


    return (
        <div className="middle-upper-1 bg-pink-600 border-amber-300 border-2 justify-center items-center p-1 overflow-hidden ml-1 mr-1 w-1/3 rounded-2xl h-3/4 content-center" style={{background : `${color}`}}>
            
            <h1>{props.name}</h1>
            <NavLink to={props.url} >
            <h1>Entry Exit</h1>
            </NavLink>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, voluptate.</p>
        </div>
    )
}

export default Middle_upper;