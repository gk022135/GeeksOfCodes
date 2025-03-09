

function AdminPro() {


    const dataFromLocalStorage = localStorage.getItem("UserData");
    const AdminInfo = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null

    return (
        <div className="flex border-2 border-amber-300 m-4 rounded-2xl">
            <div className="m-2 text-6xl p-2 font-bold border-2 border-blue-500 rounded-full bg-gradient-to-tl from-red-400 to-blue-600 bg-clip-text text-transparent">
              {AdminInfo.name[0]}
            </div>
            <div className="flex flex-col mt-7 text-white font-bold">
                <h1>{AdminInfo.name}</h1>
                <h1>{AdminInfo.email}</h1>
            </div>
        </div>
    )

}
export default AdminPro