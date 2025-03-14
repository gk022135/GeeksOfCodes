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

import AdminHome from "./Teacher-pages/Admin_Home";
import AdminLogin from "./signup-login/AdminLogin";
import Create_class from "./Teacher-pages/Create_Class";
import All_Class_adm from "./Teacher-pages/All_Class_Ad";
import TodoHome from "./components/TodoHome";
import All_Class_Std from "./user-pages/All_class_std";
import All_Class from "./user-pages/All_Class";
import PopComponent from "./UiComponents/PopupComponent";
import AddEntryExitQr from "./Teacher-pages/AddEntryExitQr";
import EntriesLog from "./Teacher-pages/AllEntryExits";
import DeleteCourse from "./Teacher-pages/Delete_Class";
import HomeDiscussion from "./Discusion/HomeDiscussion";
import MakePost from "./Discusion/MakePost";
import ImageUpload from "./Discusion/ImageUploadComp";
import SuperUserHome from "./Adminstrator/Super_User_home";
import SUlogin from "./Adminstrator/AdminstratorLogin";
import FacultyDetails from "./Adminstrator/Faculty_Details";
import StudentAuthorise from "./Authorization/StudentAuthorise";
import AdminstratorAuth from "./Authorization/AdminstratorAuth";
import TeacherAuthorise from "./Authorization/TeacherAuthorise";
import CommunityNavbar from "./Discusion/CommunityNavbar";



function App() {
  return (
    <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
      <>
        <div className='fixed top-0 z-20 w-full'>
          <Navbar />
        </div>

        <div className='w-full h-screen bg-blue-300 mt-16'>


          <Routes>
            <Route element={<AdminstratorAuth />}>
              <Route path="/qrgenerator" element={<QrGenerator />} />
              <Route path="/delete" element={<DeleteCourse />} />
              <Route path="/administrator" element={<SuperUserHome />} />
              <Route path="/qrrr" element={<AddEntryExitQr />} />

            </Route>




            {/* Teacher Routes */}
            <Route element={<TeacherAuthorise />}>
              <Route path='/admin-dashboard' element={<AdminHome />} />
              <Route path="/create-class" element={<Create_class />} />
              <Route path="/all-classes-adm" element={<All_Class_adm />} />
              
             
            </Route>


            {/* User Routes (Protected by StudentAuthorise) */}
            <Route element={<StudentAuthorise />}>
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/todo-home" element={<TodoHome />} />
              
              <Route path="/qrscanner" element={<Qr_res />} />
              <Route path="/discussion" element={<HomeDiscussion />} />
              <Route path="/discussion/makepost" element={<MakePost />} />
              <Route path="/upload" element={<ImageUpload />} />
            </Route>





            <Route path="/popcomp" element={<PopComponent />} />
            <Route path="/qrscanner" element={<Qr_res />} />
            <Route path="/all-classes" element={<All_Class />} />
            <Route path="/all-classes-student" element={<All_Class_Std />} />
            <Route path="/otpvarification" element={<Otpvarifiacation />} />



            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otpvarification" element={<Otpvarifiacation />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path="/administrator-login" element={<SUlogin />} />

            <Route path="/makepost"element = {<MakePost />} />


          </Routes>


          <HashLoader color='green' />
          <div className="flex flex-col text-xl z-20 border-2 ">
            <a href="/otpvarification">otpvarification</a>
            <a href="/qrscanner">qrscanner</a>
            <a href="/qrgenerator">qrgenerator</a>
            <a href="/admin-dashboard">teacher-dashboard</a>
            <a href="/admin-login">Teacher-login</a>
            <a href="/user-home">user-home</a>
            <a href="/discussion/makepost">Mkae posts</a>
            <a href="/upload">Image Upload</a>
            <a href="/administrator">Adminstrator Dashboard</a>
            <a href="/administrator-login">Administrator Login</a>
          </div>
        </div>


        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
