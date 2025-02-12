import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import './App.css';
import Signup from './signup-login/Signup';
import Login from './signup-login/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import UserHome from './user-pages/UserHome';
import AdminHome from "./admin-pages/adminHome";
import Otpvarifiacation from "./signup-login/OtpVarification";

function App() {
  return (
    <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
      <>
      <div className='fixed top-0 z-20 w-full'>
          <Navbar />
        </div>

        <div className='w-full h-screen bg-amber-400 mt-17'>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/login" element={<Login />} />
            <Route path = '/admin-dashboard' element = {<AdminHome/>} />
            <Route path="/otpvarification" element = {<Otpvarifiacation />} />
          </Routes>
          <HashLoader color='green' /> 
        </div>

        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
