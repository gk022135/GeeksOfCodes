import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import './App.css';
import Signup from './signup-login/Signup';
import Login from './signup-login/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import UserHome from './user-pages/UserHome';
import Otpvarifiacation from "./signup-login/OtpVarification";
import QrScanner from "./QR/QR_Scanner";
import Qr_res from "./user-pages/Qr_res";
import QrGenerator from "./QR/QrGenerator";

import AdminHome from "./admin-pages/Admin_Home";
import AdminLogin from "./signup-login/AdminLogin";
import Create_class from "./admin-pages/Create_Class";
import All_Class_adm from "./admin-pages/All_Class_Ad";
import TodoHome from "./components/TodoHome";
import All_Class_Std from "./user-pages/All_class_std";
import All_Class from "./user-pages/All_Class";
import PopComponent from "./UiComponents/PopupComponent";
import AddEntryExitQr from "./admin-pages/AddEntryExitQr";
import EntriesLog from "./admin-pages/AllEntryExits";
import DeleteCourse from "./admin-pages/Delete_Class";
import HomeDiscussion from "./Discusion/HomeDiscussion";
import MakePost from "./Discusion/MakePost";
import ImageUpload from "./Discusion/ImageUploadComp";
import SuperUserHome from "./Adminstrator/Super_User_home";
import SUlogin from "./Adminstrator/AdminstratorLogin";
import FacultyDetails from "./Adminstrator/Faculty_Details";



function App() {
  return (
    <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
      <>
        <div className='fixed top-0 z-20 w-full'>
          <Navbar />
        </div>

        <div className='w-full h-screen bg-blue-300 mt-16'>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/login" element={<Login />} />

            <Route path="/otpvarification" element={<Otpvarifiacation />} />
            <Route path="/qrscanner" element={<Qr_res />} />
            <Route path="/qrgenerator" element={<QrGenerator />} />

            <Route path='/admin-dashboard' element={<AdminHome />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path="/create-class" element = {<Create_class />} />
            <Route path="/all-classes-adm" element = {<All_Class_adm />} />

            <Route path="/todo-home" element={<TodoHome /> } />
            <Route path="/all-classes-student" element = {<All_Class_Std />} />

            <Route path="/all-classes" element = {<All_Class />} />
            <Route path="/popcomp" element = {<PopComponent />} />
            <Route path="/qrrr" element={<AddEntryExitQr />} />
            <Route path="/delete" element={<DeleteCourse/>} />
            <Route path="/discussion" element={<HomeDiscussion/>} />
            <Route path="/discussion/makepost" element={<MakePost />} />
            <Route path="/upload" element={<ImageUpload />} />

            <Route path="/adminstrator" element={<SuperUserHome />} />
            <Route path="/admistrator-login" element={<SUlogin />} />
           
            

            
            
            {/* <Route path="/xyz" element={<EntriesLog />} /> */}


          </Routes>
          <HashLoader color='green' />
          <div className="flex flex-col text-xl z-20 border-2 ">
            <a href="/otpvarification">otpvarification</a>
            <a href="/qrscanner">qrscanner</a>
            <a href="/qrgenerator">qrgenerator</a>
            <a href="/admin-dashboard">admin-dashboard</a>
            <a href="/admin-login">admin-login</a>
            <a href="/user-home">user-home</a>
            <a href="/discussion/makepost">Mkae posts</a>
            <a href="/upload">Image Upload</a>
            <a href="/adminstrator">Adminstrator Dashboard</a>
            <a href="/admistrator-login">Administrator Login</a>
          </div>
        </div>


        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
