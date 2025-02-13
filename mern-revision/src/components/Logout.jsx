import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate(); // Hook to navigate after logout

    function logoutHandler() {
        localStorage.clear(); // Clears all stored data
        navigate("/login"); // Redirects to login page
    }

    return (
        <div className="cursor-pointer" onClick={logoutHandler}>
            <h1>Logout</h1>
        </div>
    );
}

export default Logout;
