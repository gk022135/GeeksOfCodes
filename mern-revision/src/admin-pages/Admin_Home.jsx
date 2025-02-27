import AddQr from "./Add_Qr";
import AdminPro from "./AdminPro";
import All_Class_adm from "./All_Class_Ad";
import CreateClassRedirect from "./CreateClassUrl";
import DeleteUser from "./Delete_Class";
import Attendance from "./Mark_Attendance";

function AdminHome() {
    const dataFromLocalStorage = localStorage.getItem("UserData");

    const AdminInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null


    return (
        <div className="flex flex-col">
            <div className="flex z-10 justify-center content-center bg-black/80 top-14 fixed w-full ">
                <h1 className="z-20 text-3xl p-4 font-bold bg-gradient-to-tr from-pink-500 to-blue-500 bg-clip-text text-transparent/20">
                   Admin Dashboard
                </h1>

            </div>

            <div className="flex flex-col sm:flex-row relative z-0 rounded-2xl gap-2 p-2 top-14">
                <div className="sm:w-1/5 sm:flex-row  bg-gradient-to-tr from-black to-green-800 sm:h-screen rounded-2xl h-[400px]">
                  <AdminPro />
                  <CreateClassRedirect />
                  <AddQr />
                  <DeleteUser />
                  <Attendance />

                </div>

                <div className=" sm:w-4/5 bg-gradient-to-br from-black to-green-400 sm:h-screen rounded-2xl h-[400px]">

                    <All_Class_adm />
                </div>


            </div>
        </div>
    )
}
export default AdminHome;